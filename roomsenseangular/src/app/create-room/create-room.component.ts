import { Component, OnInit, NgModule, } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, } from '@angular/forms';
import { SensorData, Devices} from './../models/SensorData.model';
import { SensorDataService } from '../services/sensor-data.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';




@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
})

export class CreateRoomComponent implements OnInit {
  private dataSubscription: Subscription;
  allDeviceData: Devices [] = [];
  roomDeviceData: Devices [] = [];
  Once: boolean;

  //FormInputs and Validators
  roomNameControl = new FormControl('', [Validators.required]);
  raspberryControl = new FormControl('', [Validators.required]);
  messageControl = new FormControl();
  lowertempControl = new FormControl();
  uppertempControl = new FormControl();
  lowerhumiControl = new FormControl();
  upperhumiControl = new FormControl();
  createRoomForm: FormGroup;
  raspberryarr: string[] = []; // holds the options for the Dropdown menu


  all_devices: Devices[] = [];        //contains all devices wich have send data
  used_devices: Devices[] = [];       //contains all devicec wich are in set to a room
  unused_devices: string[] = [];      //contains all devicec wich are not set to a room

  constructor(public sensorDataService: SensorDataService, public snackbar: MatSnackBar){}

  getErrorMessage() {
    return this.roomNameControl.hasError('required') ? 'Bitte einen Namen vergeben' :
      '';
  }

  ngOnInit() {
    this.getDevices();
  }

  getDevices()
  {
    this.Once = true;
    this.sensorDataService.getDevices();
    this.sensorDataService.getRoomDevices();
     this.dataSubscription = this.sensorDataService.getDataUpdateListener()
      .subscribe((sentData: Devices []) => {
        if(this.Once){
          this.roomDeviceData = sentData;
          this.Once = false;
        }
        else {
          this.allDeviceData = sentData;
          this.finished_subscription();
        }
      }); 
  }

  //process Data after it is recievd
  finished_subscription(){
    let all_devices: string[] = [];     //contains all devices wich have send data
    let used_devices: string[] = [];    //contains all devicec wich are in set to a room
    let unused_devices: string[] = [];  //contains all devicec wich are not set to a room


    //get all devicec from querry
    for(let i = 0; i < this.allDeviceData.length; i++)
    {
      all_devices[i] = "" + this.allDeviceData[i];
      all_devices[i] = all_devices[i].substr(1,all_devices[i].length-2);
    }
    //console.log(all_devices);

    //get all used devicec from querry
    for(let i = 0; i < this.roomDeviceData.length; i++)
    {
      used_devices[i] = "" + this.roomDeviceData[i];
      used_devices[i] = used_devices[i].substr(1,used_devices[i].length-2);
    }
    //console.log(used_devices);

    //get all unused devicec checking the 2 arrays
    for (let i = 0; i < all_devices.length; i++) {
      if((used_devices.includes(all_devices[i]))){}
      else
        unused_devices.push(all_devices[i]);
    }
    //console.log(unused_devices);

    //give data to drop down menu
    for (let i = 0; i < unused_devices.length; i++) {
      this.raspberryarr[i] = unused_devices[i];
    }
  }

  onSubmit() {
    let snackBarRef = this.snackbar.open('Raum ' + this.roomNameControl.value + ' erstellt', 'close', {duration: 5000});
    let message : boolean;
    let id = "" + Math.floor((Date.now() / 1000) - 7);

    let uppertemp = this.uppertempControl.value;
    let lowertemp = this.lowertempControl.value;
    let upperhumi = this.upperhumiControl.value;
    let lowerhumi  = this.lowerhumiControl.value;

    if(uppertemp < lowertemp)
    {
      lowertemp = this.upperhumiControl.value;
      upperhumi = this.lowertempControl.value;
    }
    if(upperhumi < lowerhumi)
    {
      lowerhumi = this.upperhumiControl.value;
      upperhumi = this.lowerhumiControl.value;
    }

    if (this.messageControl.value)
      message = true;
    else
    message = false;

    //set roomname length to 10 characters
    var roomname = ""+ this.roomNameControl.value;
    if(roomname.length<10)
      for(let i = roomname.length; i<10;i++)
        roomname = roomname + ' ';
    
    this.sensorDataService.saveRoom(this.raspberryControl.value, roomname,lowertemp, uppertemp, lowerhumi, upperhumi, message, id)
      .subscribe((responseData) => {
          //console.log('Response from Server: ' + responseData.message);
      })


    //Remove used raspberry
    const index: number = this.raspberryarr.indexOf(this.raspberryControl.value);
    if (index !== -1) {
        this.raspberryarr.splice(index, 1);
    }
    
    //clear Input fields
    this.roomNameControl.reset();
    this.raspberryControl.reset();
    this.messageControl.reset();
    this.lowertempControl.reset()
    this.uppertempControl.reset();
    this.lowerhumiControl.reset()
    this.upperhumiControl.reset();

  }
}



