import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoomSettings } from './../models/RoomData.model' ;
import { SensorDataService } from '../services/sensor-data.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-warning-box',
  templateUrl: './warning-box.component.html',
  styleUrls: ['./warning-box.component.css']
})
export class WarningBoxComponent {
  public dataSubscription: Subscription;
  roomSettings: RoomSettings[] = [];

  constructor(public sensorDataService: SensorDataService, private router: Router) {}
  
  
  data = [
    {id: 'Raum1', description: 'Temperatur überschreitet Grenzwert', },
    {id: 'Raum2', description: 'Fehlermeldung', },
    {id: 'Raum3', description: 'Test3', },
    {id: 'Raum4', description: 'Test4', },
    {id: 'Raum5', description: 'Test5', },
    {id: 'Raum6', description: 'Test6', },
    {id: 'Raum7', description: 'Test7', },
    {id: 'Raum8', description: 'Test8', },
    {id: 'Raum9', description: 'Test9', },
  ];
  

  onRoomClicked() {
    this.router.navigate(['rooms']);
  }

  ngOnInit() {
    this.getSettings();
  }

  getSettings(){
    //Read room Data Settings
    this.sensorDataService.getRoomSettings();
    this.dataSubscription = this.sensorDataService.getDataUpdateListener()
      .subscribe((sentData: RoomSettings []) => {
        this.roomSettings = sentData;
        this.update();
      });
  }
  update(){
    let raspberyIds: string[] = [];

    //get raspberryIds from all rooms
    for (let i = 0; i < this.roomSettings.length; i++) {
      raspberyIds[i] = this.roomSettings[i].deviceId;
    }
    //console.log(raspberyIds);
    


    //Check if Changed

  }
}



