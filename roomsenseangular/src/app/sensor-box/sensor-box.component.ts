import { SensorDataService } from './../services/sensor-data.service';
import { Subscription } from 'rxjs';

import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-sensor-box',
  templateUrl: './sensor-box.component.html',
  styleUrls: ['./sensor-box.component.css']
})
export class SensorBoxComponent implements OnInit, OnDestroy {

  constructor(public sensorDataService: SensorDataService) { }


  fullData: any[] = [];
  clickedDeviceData: any;
  fullDataSubscription: Subscription;
  dataInterval: any;

  data = [
    { id: 'Raum1', temperature: "2°C", humidity: "40%" },
    { id: 'Raum2', temperature: "1°C", humidity: "40%" },
    { id: 'Raum3', temperature: "2°C", humidity: "50%" },
    { id: 'Raum4', temperature: "5°C", humidity: "40%" },
    { id: 'Raum5', temperature: "2°C", humidity: "60%" },
    { id: 'Raum6', description: 'Test6', },
    { id: 'Raum7', description: 'Test7', },
    { id: 'Raum8', description: 'Test8', },
    { id: 'Raum9', description: 'Test9', },
  ]


  ngOnInit(): void {
    this.fullDataSubscription = this.sensorDataService.getFullDataUpdateListener().subscribe((updatedFullData: any[]) => {
      // console.log('Neuer Log im Sensor Box Component: ' + JSON.stringify(updatedFullData));
      this.fullData = updatedFullData;
      //console.log('Updated full data: ' + updatedFullData);
    });


    this.sensorDataService.getFullRoomData();

    // Intervall starten wichtig //////////////////////////////////////////////////////////////
    this.dataInterval = setInterval(() => {
      console.log('Neues Intervall!');
      this.sensorDataService.getFullRoomData();
    }, 5000);
    // Intervall starten wichtig ////////////////////////////////////////////////////////////



    // let stringifiedData = JSON.stringify(updatedFullData);
    /* let index = updatedFullData.indexOf('yannik-rpi3');
    console.log('index: ' + index);
    console.log(updatedFullData[0].deviceId); */
    /*  let index = this.getIndexOfSelectedDevice(updatedFullData , 'yannik-rpi3');
     console.log('Gefundender Index: ' + index);
     this.clickedDeviceData = updatedFullData[index];
     console.log('Gecklickte Daten: ' + JSON.stringify(this.clickedDeviceData)); */
    // });

  }

  public onRoomItemClick(event: any, dataEntry: any) {
    console.log('Event Data: ' + JSON.stringify(event));
    console.log('Data Entry: ' + JSON.stringify(dataEntry));
    console.log('Device Id: ' + dataEntry.id);
    // this.sensorDataService.storeClickedDevice();
  }

  ngOnDestroy(): void {
    this.fullDataSubscription.unsubscribe();
    clearInterval(this.dataInterval);
    console.log('Daten Intervall in Sensor-Box gestoppt');
    }



}
