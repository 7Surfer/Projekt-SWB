using System;
using System.Text;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
//Debug
using System.Diagnostics;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;

//I2C
using System.Threading.Tasks;
using Windows.Devices.I2c;
using Windows.Devices.Enumeration;
using Windows.UI.Core;
using Microsoft.Azure.Devices.Client;

//Json
using Newtonsoft.Json;
//
using Windows.Security.ExchangeActiveSyncProvisioning;



// Die Elementvorlage "Leere Seite" wird unter https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x407 dokumentiert.


namespace DeviceToCloudEventHub
{


    public sealed partial class MainPage : Page
    {

        private static int timer_intervall_ms = 5000;

        private I2cDevice i2cDevice;
        private DispatcherTimer timer;

        //Measuarment Class
        public class Measurenent
        {
            public string DeviceId { get; set; }
            public string Timestamp = DateTime.Now.ToString();
            public double Temperature { get; set; }
            public double Humidity { get; set; }

            public Measurenent(string deviceID, double temperature, double humidity)
            {
                this.Temperature = temperature;
                this.Humidity = humidity;
                this.DeviceId = deviceID;
            }
        }

        public MainPage()
        {
            this.InitializeComponent();

            //call async function at start of programm
            Async_start();
        }

        //string deviceId = new EasClientDeviceInformation().FriendlyName;

        //need a async methode to start the task
        async void Async_start()
        {
            await Start();
        }

        private async Task Start()
        {
            //return i2c controller
            string i2cDeviceSelector = I2cDevice.GetDeviceSelector();
            //find I2C bus controller device with selector string
            IReadOnlyList<DeviceInformation> devices = await DeviceInformation.FindAllAsync(i2cDeviceSelector);

            // create the settings and specify the device adress
            // device adress from data sheet (https://www.silabs.com/documents/public/data-sheets/Si7021-A20.pdf Page 40)
            var si7021_settings = new I2cConnectionSettings(0x40);
            i2cDevice = await I2cDevice.FromIdAsync(devices[0].Id, si7021_settings);

            // Start the polling timer.
            timer = new DispatcherTimer() { Interval = TimeSpan.FromMilliseconds(timer_intervall_ms) };
            timer.Tick += Timer_Tick;
            timer.Start();
        }

        private void Timer_Tick(object sender, object e)
        {
            // Read data from I2C.
            var command = new byte[1];
            var humidityData = new byte[2];
            var temperatureData = new byte[2];

            // Read humidity.
            // adress got from data sheet (https://www.silabs.com/documents/public/data-sheets/Si7021-A20.pdf Page 40)
            command[0] = 0xE5;
            i2cDevice.WriteRead(command, humidityData);

            // Read temperature.
            command[0] = 0xE3;
            i2cDevice.WriteRead(command, temperatureData);

            // Calculate and report the humidity.
            var rawHumidityReading = humidityData[0] << 8 | humidityData[1];
            var humidityRatio = rawHumidityReading / (float)65536;
            double humidity = -6 + (125 * humidityRatio);
            //round to 2 decimal
            humidity = Math.Round(humidity, 2);


            // Calculate and report the temperature.
            var rawTempReading = temperatureData[0] << 8 | temperatureData[1];
            var tempRatio = rawTempReading / (float)65536;
            double temperature = (-46.85 + (175.72 * tempRatio)) * 9 / 5 + 32;
            //calculate from fahrenheit into Celcius
            temperature = (temperature - 32) / 1.8; //(F - 32) ÷ 1.8
            //round to 2 decimal
            temperature = Math.Round(temperature, 2);


            //Call function to send data to cloud
            Send_data(temperature, humidity);
        }

        //private async void Send_data(double temp, double humi)
        private async void Send_data(double temp, double humi)
        {
            string iotHubUri = "IoTHubHE.azure-devices.net";
            string deviceKey = "";
            string deviceId2 = "yannik-rpi3";

            var deviceClient = DeviceClient.Create(iotHubUri, AuthenticationMethodFactory.CreateAuthenticationWithRegistrySymmetricKey(deviceId2, deviceKey), TransportType.Http1);

            //create class with meassurement
            Measurenent measurement = new Measurenent(deviceId2, temp, humi);
            var payload = JsonConvert.SerializeObject(measurement);


            Message message = new Message(Encoding.UTF8.GetBytes(payload));

            //Write to consol for testing
            Debug.WriteLine("Message: " + payload);
            //Send to Cloud
            await deviceClient.SendEventAsync(message);
        }



        //Quit app
        private void Button_Click(object sender, RoutedEventArgs e)
        {
            Application.Current.Exit();
        }
    }
}