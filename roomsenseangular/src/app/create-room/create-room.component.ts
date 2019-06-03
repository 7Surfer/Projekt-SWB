import { Component, OnInit, NgModule, } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { SensorData,Roomdata} from './../models/SensorData.model';
import { SensorDataService } from '../services/sensor-data.service';
import { Subscription } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
})

export class CreateRoomComponent implements OnInit {
  private dataSubscription: Subscription;

  roomNameControl = new FormControl('', [Validators.required]);
  raspberryControl = new FormControl('', [Validators.required]);
  messageControl = new FormControl();
  lowertempControl = new FormControl();
  uppertempControl = new FormControl();
  lowerhumiControl = new FormControl();
  upperhumiControl = new FormControl();
  createRoomForm: FormGroup;
  valid = false;

  data: Roomdata [] = [];
  dataToDisplay: Roomdata [];
  isLoading = false;
  public raspberryarr: string[] = []; // holds the options for the Dropdown menu
  

  constructor(public sensorDataService: SensorDataService, public snackbar: MatSnackBar){}

  getErrorMessage() {
    return this.roomNameControl.hasError('required') ? 'Bitte einen Namen vergeben' :
      '';
  }
  

  ngOnInit() {
    this.valid = false;
    this.sensorDataService.getDataroom();
    this.isLoading = true;
    this.dataSubscription = this.sensorDataService.getDataUpdateListener()
      .subscribe((sentData: Roomdata []) => {
        this.isLoading = false;
        this.data = sentData;
        this.dataToDisplay = JSON.parse('[' + sentData + ']');
        this.finished_subscription()
      });
  }

 

  //process Data after it is recievd
  finished_subscription(){
    let all_devices: string[] = [];     //contains all devices wich have send data
    let used_devices: string[] = [];    //contains all devicec wich are in set to a room
    let unused_devices: string[] = [];  //contains all devicec wich are not set to a room

    //get all devicec from querry
    for (let entry of this.dataToDisplay) {
      if( entry.room == undefined)
        all_devices.push(entry.deviceId);
    }

    //get all used devicec from querry
    for (let entry of this.dataToDisplay) {
      if( entry.room != undefined)
        used_devices.push(entry.deviceId);
    }

    //get all unused devicec checking the 2 arrays
    for (let i = 0; i < all_devices.length; i++) {
      if((used_devices.includes(all_devices[i]))){}
      else
        unused_devices.push(all_devices[i]);
    }
    
    //give data to drop down menu
    for (let i = 0; i < unused_devices.length; i++) {
      this.raspberryarr[i] = unused_devices[i];
    }
  }

  //test item
  testitem = {
    "newRoom":{
      "room": "raum3",
      "deviceId": "device3",
      "lowertemp": 20,
      "uppertemp": 30,
      "lowerhumi": 30,
      "upperhumi": 60,
      "notification": true
    }
  }

  onSubmit() {
    let snackBarRef = this.snackbar.open('Raum ' + this.roomNameControl.value + ' erstellt', 'close', {duration: 5000});
    
    //einkommentieren für reale Werte
    /*
    this.testitem.newRoom.room = this.roomNameControl.value;
    this.testitem.newRoom.lowertemp = this.lowertempControl.value;
    this.testitem.newRoom.uppertemp = this.uppertempControl.value;
    this.testitem.newRoom.lowerhumi = this.lowertempControl.value;
    this.testitem.newRoom.upperhumi = this.uppertempControl.value;
    if (this.messageControl.value)
      this.testitem.newRoom.notification = true;
    else
      this.testitem.newRoom.notification = false;
    */
    console.log(this.testitem);
    

    //Send Data to nodejs function "insertroom(string)"


    this.roomNameControl.reset();
    this.raspberryControl.reset();
    this.messageControl.reset();
    this.lowertempControl.reset();
    this.uppertempControl.reset();
    this.lowerhumiControl.reset();
    this.upperhumiControl.reset();
    
  }
}



