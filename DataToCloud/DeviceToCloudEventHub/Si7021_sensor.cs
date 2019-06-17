using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//Debug
using System.Diagnostics;

//I2C
using Windows.Devices.I2c;
using Windows.Devices.Enumeration;
using Windows.UI.Core;
using Microsoft.Azure.Devices.Client;

namespace DeviceToCloudEventHub
{
    class Si7021_sensor
    {
        //Set the count of the rounded decimal number
        private static int accuracy = 2;

        private I2cDevice i2cDevice;

        //Setup device with i2c
        public async void Setup_device()
        {
            //return i2c controller
            string i2cDeviceSelector = I2cDevice.GetDeviceSelector();
            //find I2C bus controller device with selector string
            IReadOnlyList<DeviceInformation> devices = await DeviceInformation.FindAllAsync(i2cDeviceSelector);

            // create the settings and specify the device adress
            // device adress from data sheet (https://www.silabs.com/documents/public/data-sheets/Si7021-A20.pdf Page 18)
            var si7021_settings = new I2cConnectionSettings(0x40);
            i2cDevice = await I2cDevice.FromIdAsync(devices[0].Id, si7021_settings);
        }

        //Read Temperatuire from I2C
        public double Get_temperature()
        {
            // Read data from I2C.
            var command = new byte[1];
            var temperatureData = new byte[2];


            // adress got from data sheet (https://www.silabs.com/documents/public/data-sheets/Si7021-A20.pdf Page 18)
            // Read temperature.
            command[0] = 0xE3;
            i2cDevice.WriteRead(command, temperatureData);

            // Calculate and report the temperature.
            var rawTempReading = temperatureData[0] << 8 | temperatureData[1];
            var tempRatio = rawTempReading / (float)65536;
            double temperature = (-46.85 + (175.72 * tempRatio)) * 9 / 5 + 32;
            //calculate from fahrenheit into Celcius
            temperature = (temperature - 32) / 1.8; //(F - 32) ÷ 1.8
            //round to 2 decimal
            temperature = Math.Round(temperature, accuracy);

            return temperature;
        }

        //Read Humidity from I2C
        public double Get_humidity()
        {
            // Read data from I2C.
            var command = new byte[1];
            var humidityData = new byte[2];

            // Read humidity.
            // adress got from data sheet (https://www.silabs.com/documents/public/data-sheets/Si7021-A20.pdf Page 18)
            command[0] = 0xE5;
            try
            {
                i2cDevice.WriteRead(command, humidityData);
            }
            catch (Exception e)
            {
                Console.WriteLine("Error on I2C device. Check cable connections");
                Console.WriteLine(e);
            }
            // Calculate and report the humidity.
            var rawHumidityReading = humidityData[0] << 8 | humidityData[1];
            var humidityRatio = rawHumidityReading / (float)65536;
            double humidity = -6 + (125 * humidityRatio);
            //round to 2 decimal
            humidity = Math.Round(humidity, accuracy);

            return humidity;
        }
    }
}
