import { SensorDataService } from './../services/sensor-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-room-yannik',
  templateUrl: './create-room-yannik.component.html',
  styleUrls: ['./create-room-yannik.component.css']
})
export class CreateRoomYannikComponent implements OnInit {

  deviceName: string;
  roomName: string;
  upperLimit: number;
  lowerLimit: number;
  ts: number;

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit() {
  }



  onAddRoom() {
    alert('Room information addded!');
    console.log(this.deviceName, this.roomName, this.lowerLimit, this.upperLimit);
    this.sensorDataService.saveRoomInfo(this.deviceName, this.roomName, this.lowerLimit, this.upperLimit)
      .subscribe((responseData) => {
        console.log('Antwort vom Server: ' + responseData);
      });
  }

}
