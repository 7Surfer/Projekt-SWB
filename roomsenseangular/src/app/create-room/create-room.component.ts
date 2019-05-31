import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SensorData,Roomdata} from './../models/SensorData.model';
import { SensorDataService } from '../services/sensor-data.service';
import { Subscription } from 'rxjs';





@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
})

export class CreateRoomComponent implements OnInit {

  form: FormGroup;
  private new_room = false;           // enable/disable form
  private dataSubscription: Subscription;
  data: Roomdata [] = [];
  dataToDisplay: Roomdata [];
  isLoading = false;
  public raspberryarr: string[] = []; // holds the options for the Dropdown menu

  constructor(private formBuilder: FormBuilder,public sensorDataService: SensorDataService ) {}

  ngOnInit() {
    //validation of room name (min 1 character)
    this.form = this.formBuilder.group({
      room_name: [null, [Validators.required, Validators.minLength(1)]],
    });

  }

  //calls on Button new click
  new_click(){
    this.new_room = true;
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

  //disable form //neds database update (mabye double name check / nativ input error checks)
  onSubmit() {
    this.new_room = false;
  }
  
}



