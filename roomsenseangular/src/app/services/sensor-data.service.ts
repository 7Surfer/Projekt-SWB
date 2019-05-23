import { SensorData } from './../models/SensorData.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  constructor(private http: HttpClient) { }

  private data: SensorData[] = [];
  private dataUpdated = new Subject<SensorData[]>();

  getData() {
    return [{"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.65,"timestamp":1558370924},
    {"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.67,"timestamp":1558370918},
    {"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.68,"timestamp":1558370913},
    {"deviceId":"raspberryLuca","temperature":25.75,"humidity":35.73,"timestamp":1558370908},
    {"deviceId":"raspberryLuca","temperature":25.75,"humidity":35.74,"timestamp":1558370903},
    {"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.78,"timestamp":1558370897}];
  }

  getDateUpdateListener() {
    return this.dataUpdated.asObservable();
  }


  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error!')
  }
}
