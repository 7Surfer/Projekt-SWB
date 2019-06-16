import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormControl, } from '@angular/forms';
import { SensorDataService } from '../services/sensor-data.service';
import { Subscription } from 'rxjs';
import { RoomSettings } from './../models/RoomData.model';
import { ComponentFactoryResolver } from '@angular/core/src/render3';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-roomsettings',
  templateUrl: './roomsettings.component.html',
  styleUrls: ['./roomsettings.component.css']
})
export class RoomsettingsComponent implements OnInit {
  roomNameControl = new FormControl('', [Validators.required]);
  raspberryControl = new FormControl('', [Validators.required]);
  messageControl = new FormControl();
  lowertempControl = new FormControl();
  uppertempControl = new FormControl();
  lowerhumiControl = new FormControl();
  upperhumiControl = new FormControl();
  createRoomForm: FormGroup;

  allDeviceData: RoomSettings [] = [];
  private dataSubscription: Subscription;
  constructor(private route: ActivatedRoute, public sensorDataService: SensorDataService, public snackbar: MatSnackBar, public router: Router) { }

  id: string;
  currentRoom : RoomSettings;
  roomNamePlaceholder : string;

  ngOnInit() {
    //get deviceId from active Room
    this.id = this.route.snapshot.paramMap.get('deviceId');
    
    //get all rooms
    this.getAllRooms()
  }

  getErrorMessage() {
      return this.roomNameControl.hasError('required') ? 'Bitte einen Namen vergeben' :
        '';
  }

  getAllRooms(){
    this.sensorDataService.getallRooms();
     this.dataSubscription = this.sensorDataService.getDataUpdateListener()
      .subscribe((sentData: RoomSettings []) => {
        this.allDeviceData = sentData;
        this.finished_subscription();
      }); 
  }

  finished_subscription(){
    //filter current room from all rooms
    for (let entry of this.allDeviceData)
      if(entry.deviceId == this.id)
       this.currentRoom = entry;

    this.roomNameControl.setValue(this.currentRoom.roomName);
    this.raspberryControl.disable();
    this.raspberryControl.setValue(this.currentRoom.deviceId);
    this.lowertempControl.setValue(this.currentRoom.lowerTempLimit);
    this.uppertempControl.setValue(this.currentRoom.upperTempLimit);
    this.lowerhumiControl.setValue(this.currentRoom.lowerHumiLimit);
    this.upperhumiControl.setValue(this.currentRoom.upperHumiLimit);
    this.messageControl.setValue(this.currentRoom.message);
  }

  onSubmit(){
    let snackBarRef = this.snackbar.open('Raum ' + this.roomNameControl.value + ' gespeichert', 'close', {duration: 5000});
    let message : boolean;
    if (this.messageControl.value)
      message = true;
    else
    message = false;

    //set roomname length to 10 characters
    var roomname = ""+ this.roomNameControl.value;
    if(roomname.length<10)
      for(let i = roomname.length; i<10;i++)
        roomname = roomname + ' ';

    this.sensorDataService.updateRoom(this.raspberryControl.value, roomname, this.lowertempControl.value, this.uppertempControl.value, this.lowerhumiControl.value, this.upperhumiControl.value, message, this.currentRoom.id)
      .subscribe((responseData) => {
          console.log('Response from Server: ' + responseData.message);
      })

    //send back to home page
    this.router.navigateByUrl('/');
  }
  
  onDelete(){
    let snackBarRef = this.snackbar.open('Raum ' + this.roomNameControl.value + ' gelöscht', 'close', {duration: 5000});
    let message : boolean;
    if (this.messageControl.value)
      message = true;
    else
    message = false;

    //set roomname length to 10 characters
    var roomname = ""+ this.roomNameControl.value;
    if(roomname.length<10)
      for(let i = roomname.length; i<10;i++)
        roomname = roomname + ' ';

    this.sensorDataService.deleteRoom(this.raspberryControl.value, roomname, this.lowertempControl.value, this.uppertempControl.value, this.lowerhumiControl.value, this.upperhumiControl.value, message, this.currentRoom.id)
      .subscribe((responseData) => {
          console.log('Response from Server: ' + responseData.message);
      })

    //send back to home page
    this.router.navigateByUrl('/');
  }
}