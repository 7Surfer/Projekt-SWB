import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RoomSettings } from './../models/RoomData.model';
import { SensorDataService } from '../services/sensor-data.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-warning-box',
  templateUrl: './warning-box.component.html',
  styleUrls: ['./warning-box.component.css']
})


export class WarningBoxComponent implements OnInit, OnDestroy {


  constructor(private router: Router, public sensorDataService: SensorDataService, public snackbar: MatSnackBar) { }

  fullData: any[] = [];
  private fullDataSubscription: Subscription;
  public dataSubscription: Subscription;
  roomSettings: RoomSettings[] = [];


  message: any[] = [{
    room: String,
    uppertemp: Boolean,
    lowertemp: Boolean,
    upperhumi: Boolean,
    lowerhumi: Boolean
  }];


  ngOnInit(): void {
    this.fullDataSubscription = this.sensorDataService.getFullDataUpdateListener()
      .subscribe((updatedFullData: any[]) => {
        this.fullData = updatedFullData;
        console.log('Daten im Warning Box Component: ' + JSON.stringify(updatedFullData));
        this.check_devices();
      });
    //this.sensorDataService.getFullRoomData();

  }

  onRoomClicked() {
    this.router.navigate(['rooms']);
  }


  update() {
    let raspberyIds: string[] = [];

    //get raspberryIds from all rooms
    for (let i = 0; i < this.roomSettings.length; i++) {
      raspberyIds[i] = this.roomSettings[i].deviceId;
    }
  }

  ngOnDestroy(): void {
    this.fullDataSubscription.unsubscribe();

  }

  uppertemp(entry){
    if(entry.temp != null && entry.temp > entry.upperTemp){
      for (let entry1 of this.message)
        if(entry.message && entry1.room == entry.room && !entry1.upperTemp){
          entry1.upperTemp = true;
          let snackBarRef = this.snackbar.open("Übertemperatur in Raum: " + entry.room , 'close', {duration: 20000});
        }
      return true;
    }
    return false;
  }
  lowertemp(entry){
    if(entry.temp != null && entry.temp < entry.lowerTemp){
      for (let entry1 of this.message)
        if(entry.message && entry1.room == entry.room && !entry1.lowerTemp){
          entry1.lowerTemp = true;
          let snackBarRef = this.snackbar.open("Untertemperatur in Raum: " + entry.room , 'close', {duration: 20000});
        }
      return true;
    }
    return false;
    
  }

  upperhumi(entry){
    if(entry.hum != null && entry.hum > entry.upperHumi){
      for (let entry1 of this.message)
        if(entry.message && entry1.room == entry.room && !entry1.upperhumi){
          entry1.upperhumi = true;
          let snackBarRef = this.snackbar.open("Erhöhte Luftfeuchtigkeit in Raum: " + entry.room , 'close', {duration: 20000});
        }
      return true;
    }
    return false;
    
  }
  lowerhumi(entry){
    this.reset_message(entry);
    if(entry.hum != null && entry.hum < entry.lowerHumi){
      for (let entry1 of this.message)
        if(entry.message && entry1.room == entry.room && !entry1.lowerhumi){
          entry1.lowerhumi = true;
          let snackBarRef = this.snackbar.open("Niedrige Luftfeuchtigkeit in Raum: " + entry.room , 'close', {duration: 20000});
        }
      return true;
    }
    return false;
  }

  reset_message(entry)
  {
    for (let entry1 of this.message)
    {
      if(entry1.room == entry.room){
        if(entry.temp != null && entry.upperTemp > entry.temp && entry.lowerTemp < entry.temp && (entry1.lowerTemp == true || entry1.upperTemp == true)){
          entry1.lowerTemp = false;
          entry1.upperTemp = false;
          let snackBarRef = this.snackbar.open("Temperatur hat sich normalisiert in Raum: " + entry.room , 'close', {duration: 20000});
        }

        //This if always false (don't know why)
        if(entry.hum != null && entry.upperHumi > entry.hum && entry.lowerHumi < entry.hum && (entry1.lowerHumi == true || entry1.upperHumi == true)){
          entry1.lowerHumi = false;
          entry1.upperhumi = false;
          let snackBarRef = this.snackbar.open("Luftfeutigkeit hat sich normalisiert in Raum: " + entry.room , 'close', {duration: 20000});
        }
      }
    }
    return;
  }

  check_devices(){
    let entry1
    let breaker = true;
    for (let entry of this.fullData)
    {
      let breaker = true;
      for (entry1 of this.message)
        if(entry.room == entry1.room)
        {
          breaker = false;
          break;
        }
      if (breaker)
      {
        let item = {};
        item ["room"] = entry.room;
        item ["uppertemp"] = false;
        item ["lowertemp"] = false;
        item ["upperhumi"] = false;
        item ["lowerhumi"] = false;
        this.message.push(item);
      }
    }
  }
}



