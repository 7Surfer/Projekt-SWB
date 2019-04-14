using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
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

//Azure Storage
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;

// Die Elementvorlage "Leere Seite" wird unter https://go.microsoft.com/fwlink/?LinkId=402352&clcid=0x407 dokumentiert.


namespace Si7021_Sensor_driver_package
{


    public sealed partial class MainPage : Page
    {
        private static string Sensore_name = "Luca";
        private static string account_name = "";
        private static string key = "";
        private static string table = "testtableluca";

        private I2cDevice si7021Sensor;
        private DispatcherTimer timer;

        public MainPage()
        {
            this.InitializeComponent();

            //call async function at start of programm
            async_start();
        }

        //need a async methode to start the task
        async void async_start()
        {
            await start();
        }

        private async Task start()
        {
            //get selector string tath will return all I 2C controller on the system
            string i2cDeviceSelector = I2cDevice.GetDeviceSelector();
            //find I2C bus controller device with selector string
            IReadOnlyList<DeviceInformation> devices = await DeviceInformation.FindAllAsync(i2cDeviceSelector);

            // create the settings and specify the device adress
            // device adress from data sheet (https://www.silabs.com/documents/public/data-sheets/Si7021-A20.pdf Page 40)
            var si7021_settings = new I2cConnectionSettings(0x40);
            si7021Sensor = await I2cDevice.FromIdAsync(devices[0].Id, si7021_settings);

            // Start the polling timer.
            timer = new DispatcherTimer() { Interval = TimeSpan.FromMilliseconds(5000) };
            timer.Tick += Timer_Tick;
            timer.Start();
        }
        int i = 0;
        public ulong counter = 0;

        private void Timer_Tick(object sender, object e)
        {
            // Read data from I2C.
            var command = new byte[1];
            var humidityData = new byte[2];
            var temperatureData = new byte[2];

            // Read humidity.
            // adress got from data sheet (https://www.silabs.com/documents/public/data-sheets/Si7021-A20.pdf Page 40)
            command[0] = 0xE5;
            si7021Sensor.WriteRead(command, humidityData);

            // Read temperature.
            command[0] = 0xE3;

            si7021Sensor.WriteRead(command, temperatureData);

            // Calculate and report the humidity.
            var rawHumidityReading = humidityData[0] << 8 | humidityData[1];
            var humidityRatio = rawHumidityReading / (float)65536;
            double humidity = -6 + (125 * humidityRatio);
            //round to 2 decimal
            humidity = Math.Round(humidity, 2);
            textblock_1.Text = humidity.ToString() + " % Feuchtigkeit";

            // Calculate and report the temperature.
            var rawTempReading = temperatureData[0] << 8 | temperatureData[1];
            var tempRatio = rawTempReading / (float)65536;
            double temperature = (-46.85 + (175.72 * tempRatio)) * 9 / 5 + 32;
            //calculate from fahrenheit into Celcius
            temperature = (temperature - 32) / 1.8; //(F - 32) ÷ 1.8
            //round to 2 decimal
            temperature = Math.Round(temperature, 2);
            textblock_1.Text += "\n" + temperature.ToString() + " °C";


            

            send_data(temperature, humidity);
        }

        private async void send_data(double temp, double humi)
        {
            CloudStorageAccount storageAccount = new CloudStorageAccount(
                new Microsoft.WindowsAzure.Storage.Auth.StorageCredentials(
               account_name, key), true);

             // Create the table client
             CloudTableClient tableClient = storageAccount.CreateCloudTableClient();

            // Get a reference to a table named "peopleTable"
            CloudTable testtable = tableClient.GetTableReference(table);

            // Create a new customer entity.
            Sensor_Data data = new Sensor_Data(temp, humi);

            // Create the TableOperation that inserts the customer entity.
            TableOperation insertOperation = TableOperation.Insert(data);

            // Execute the insert operation.
            await testtable.ExecuteAsync(insertOperation);
        }

        private class Sensor_Data : TableEntity
        {
            public double Temp { get; set; }
            public double Humidity { get; set; }
            public Sensor_Data(double new_temperature,double new_humidity)
            {
                this.PartitionKey = Sensore_name;
                this.RowKey = DateTime.Now.ToString();
                this.Humidity = new_humidity;
                this.Temp = new_temperature;
            }

        }
    }
}
