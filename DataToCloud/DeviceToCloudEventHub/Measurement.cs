using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace DeviceToCloudEventHub
{
    class Measurement : System.Collections.IEnumerable
    {
        public string DeviceId { get; set; }
        public DateTime Timestamp = DateTime.Now;
        public double Temperature { get; set; }
        public double Humidity { get; set; }
        //double maxTemp;
        //double minTemp;
        //double maxHum;
        //double minHum;

        public Measurement(string id, DateTime timestamp, double temp, double hum) {
            this.DeviceId = id;
            this.Timestamp = timestamp;
            this.Temperature = temp;
            this.Humidity = hum;
        }

        public IEnumerator GetEnumerator()
        {
            return ((IEnumerable)DeviceId).GetEnumerator();
        }

        public override string ToString()
        {
            return $"{DeviceId} um {Timestamp}: Temperatur: {Temperature} \t Luftfeuchtigkeit: {Humidity}";
        }

        public String ToJSON(Measurement mObject) {
            var data = JsonConvert.SerializeObject(mObject);
            return (String)data;
        }


    }
}
