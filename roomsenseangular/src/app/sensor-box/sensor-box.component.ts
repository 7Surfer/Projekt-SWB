import { SensorDataService } from './../services/sensor-data.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensor-box',
  templateUrl: './sensor-box.component.html',
  styleUrls: ['./sensor-box.component.css']
})
export class SensorBoxComponent implements OnInit {

  constructor(public sensorDataService: SensorDataService) {}
  data = [
    {id: 'Raum1', temperature: "2°C", humidity: "40%"},
    {id: 'Raum2', temperature: "1°C", humidity: "40%"},
    {id: 'Raum3', temperature: "2°C", humidity: "50%"},
    {id: 'Raum4', temperature: "5°C", humidity: "40%"},
    {id: 'Raum5', temperature: "2°C", humidity: "60%"},
    {id: 'Raum6', description: 'Test6', },
    {id: 'Raum7', description: 'Test7', },
    {id: 'Raum8', description: 'Test8', },
    {id: 'Raum9', description: 'Test9', },
  ]


  ngOnInit(): void {


  }

  public onRoomItemClick(event: any, dataEntry: any) {
    console.log('Event Data: ' + JSON.stringify(event));
    console.log('Data Entry: ' + JSON.stringify(dataEntry));
    console.log('Device Id: ' + dataEntry.id);
    //this.sensorDataService.storeClickedDevice();
  }
}
