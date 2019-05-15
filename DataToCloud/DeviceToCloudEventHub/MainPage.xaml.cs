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

        
        private DispatcherTimer timer;
        Si7021_sensor si7021_sensor;

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

            si7021_sensor = new Si7021_sensor();
            //call async function at start of programm
            Async_start();
        }

        //need a async methode to start the task
        async void Async_start()
        {
            await Start();
        }
        private async Task Start()
        {
            si7021_sensor.Setup_device();

            // Start the polling timer.
            timer = new DispatcherTimer() { Interval = TimeSpan.FromMilliseconds(timer_intervall_ms) };
            timer.Tick += Timer_Tick;
            timer.Start();
        }

        private void Timer_Tick(object sender, object e)
        {
            double temperature;
            double humidity;

            temperature = si7021_sensor.Get_temperature();
            humidity = si7021_sensor.Get_humidity();


            //Call function to send data to cloud
            Send_data(temperature, humidity);
        }

        //private async void Send_data(double temp, double humi)
        private async void Send_data(double temp, double humi)
        {
            string iotHubUri = "IoTHubHE.azure-devices.net";
            string deviceKey = "";
            string deviceId2 = "";

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