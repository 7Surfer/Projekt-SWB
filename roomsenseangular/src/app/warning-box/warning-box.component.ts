import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomSettings } from './../models/RoomData.model';
import { SensorDataService } from '../services/sensor-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-warning-box',
  templateUrl: './warning-box.component.html',
  styleUrls: ['./warning-box.component.css']
})
export class WarningBoxComponent implements OnInit {
  public dataSubscription: Subscription;
  roomSettings: RoomSettings[] = [];


  constructor(private router: Router, public sensorDataService: SensorDataService) { }

  fullData: any[] = [];
  private fullDataSubscription: Subscription;


  data: any[] = [
    { id: 'Raum1', temp: 1, upperTemp: 0, lowerTemp: -3, hum: 65, upperHum: 67, lowerHum: 23 },
    { id: 'Raum2', temp: 2, upperTemp: 1, lowerTemp: -5, hum: 67, upperHum: 56, lowerHum: 12 },
    { id: 'Raum3', temp: 3, upperTemp: 5, lowerTemp: -2, hum: 34, upperHum: 89, lowerHum: 45 },
    { id: 'Raum4', temp: 4, upperTemp: 2, lowerTemp: 0, hum: 12, upperHum: 23, lowerHum: 11 },
    { id: 'Raum5', temp: 5, upperTemp: 5, lowerTemp: 2, hum: 42, upperHum: 56, lowerHum: 34 },
    { id: 'Raum6', temp: 6, upperTemp: 1, lowerTemp: 7, hum: 47, upperHum: 67, lowerHum: 56 },
    { id: 'Raum7', temp: 7, upperTemp: 8, lowerTemp: 2, hum: 67, upperHum: 78, lowerHum: 65 },
    { id: 'Raum8', temp: 8, upperTemp: 9, lowerTemp: 1, hum: 54, upperHum: 67, lowerHum: 32 },
    { id: 'Raum9', temp: 9, upperTemp: 1, lowerTemp: 3, hum: 32, upperHum: 45, lowerHum: 30 },
  ];


  ngOnInit(): void {
    this.fullDataSubscription = this.sensorDataService.getFullDataUpdateListener()
      .subscribe((updatedFullData: any[]) => {
        this.fullData = updatedFullData;
        console.log('Daten im Warning Box Component: ' + JSON.stringify(updatedFullData));
      });
    this.sensorDataService.getFullRoomData();

  }

  onRoomClicked() {
    this.router.navigate(['rooms']);
  }

  /* ngOnInit() {
    this.getSettings();
  } */

  getSettings() {
    //Read room Data Settings
    this.sensorDataService.getRoomSettings();
    /* this.dataSubscription = this.sensorDataService.getDataUpdateListener()
      .subscribe((sentData: RoomSettings []) => {
        this.roomSettings = sentData;
        this.update();
      }); */
  }
  update() {
    let raspberyIds: string[] = [];

    //get raspberryIds from all rooms
    for (let i = 0; i < this.roomSettings.length; i++) {
      raspberyIds[i] = this.roomSettings[i].deviceId;
    }
    //console.log(raspberyIds);



    //Check if Changed

  }


  ngOnDestroy(): void {
    this.fullDataSubscription.unsubscribe();

  }
}



