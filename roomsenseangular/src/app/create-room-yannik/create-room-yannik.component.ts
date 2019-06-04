import { SensorDataService } from './../services/sensor-data.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IRoomData } from '../models/RoomData.model';

@Component({
  selector: 'app-create-room-yannik',
  templateUrl: './create-room-yannik.component.html',
  styleUrls: ['./create-room-yannik.component.css']
})
export class CreateRoomYannikComponent implements OnInit {

  deviceName: string = '';
  roomName: string = '';
  upperLimit: number;
  lowerLimit: number;
  //ts: number;

  constructor(public sensorDataService: SensorDataService) { }

  ngOnInit() {
  }

  onAddRoom(form: NgForm) {
    //console.log(this.deviceName, this.roomName, this.lowerLimit, this.upperLimit);
    /* this.sensorDataService.saveRoomInfo(this.deviceName, this.roomName, this.lowerLimit, this.upperLimit)
      .subscribe((responseData) => {
        console.log('Antwort vom Server: ' + responseData);
      }); */
    const roomData: IRoomData = {
      deviceName: form.value.deviceName,
      roomName: form.value.roomName,
      lowerLimit: form.value.lowerLimit,
      upperLimit: form.value.upperLimit
    };

    this.sensorDataService.saveRoomInfo(roomData.deviceName, roomData.roomName, roomData.lowerLimit, roomData.upperLimit)
      .subscribe((responseData) => {
          console.log('Response from Server: ' + responseData.message);
      })



    console.log('Room Data: ' + JSON.stringify(roomData));
  }

}
