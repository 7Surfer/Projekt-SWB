import { SensorData } from './../models/SensorData.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SensorDataService } from '../services/sensor-data.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-data-list-test',
  templateUrl: './data-list-test.component.html',
  styleUrls: ['./data-list-test.component.css']
})
export class DataListTestComponent implements OnInit, OnDestroy {

  data: SensorData [] = [];
  testData = [{"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.65,"_ts":1558370924},
  {"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.67,"_ts":1558370919},
  {"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.68,"_ts":1558370914},
  {"deviceId":"raspberryLuca","temperature":25.75,"humidity":35.73,"_ts":1558370908},
  {"deviceId":"raspberryLuca","temperature":25.75,"humidity":35.74,"_ts":1558370903},];

  private dataSubscription: Subscription;

  constructor(public sensorDataService: SensorDataService) { }


  ngOnInit() {
    this.sensorDataService.getData();
    this.dataSubscription = this.sensorDataService.getDataUpdateListener()
      .subscribe((sentData: SensorData []) => {
        this.data = sentData;
        console.log( Array.isArray(sentData) +  'Daten: ' + sentData);
      });
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }




}
