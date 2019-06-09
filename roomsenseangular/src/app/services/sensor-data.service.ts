import { SensorData } from './../models/SensorData.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, interval } from 'rxjs';
import { Subject } from 'rxjs';
import { EventEmitter } from 'events';
import {  } from '@angular/core';
import { RoomSettings } from './../models/RoomData.model' ;
@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  private fullDataUpdated = new Subject<any>();
  constructor(private http: HttpClient) { }

  data: SensorData[] = [];
  roomData: RoomSettings[] = [];
  dataUpdated = new Subject<any []>();

  // Später vielleicht
  fullData = [];

  /* getData() {
    this.http.get<{message: string, data: any}>('http://localhost:3000/api/data')
      .subscribe((sensorData) => {
        this.data = sensorData.data;
        this.dataUpdated.next([...this.data]);
        this.dataUpdated.next(this.data); Damit data im Service nicht verändert werden kann
      });
  } */

  // Wieder einkommentieren
  /* getData(): Observable<SensorData[]> {
    return this.http.get<SensorData[]>('http://localhost:3000/api/data');
  } */

  getDevices() {
    this.http.get<{message: string, data: any}>('http://localhost:3000/api/devices')
      .subscribe((sensorData) => {
        this.data = sensorData.data;
        this.dataUpdated.next([...this.data]);
      });
  }

  getRoomDevices() {
    this.http.get<{message: string, data: any}>('http://localhost:3000/api/roomdevices')
    .subscribe((sensordata) => {
      this.data = sensordata.data;
      this.dataUpdated.next([...this.data]);
    });
  }

  //start
  getRoomSettings(){
    console.log("getroom");
    this.http.get<{message: string, data: any}>('http://localhost:3000/api/roomSettings')
    .subscribe((sensordata) => {
      this.roomData = sensordata.data;
      this.dataUpdated.next([...this.roomData]);
    });
  }
    /*
  getRoomSettings(){
    this.http.get<{message: string, data: any}>('http://localhost:3000/api/roomSettings')
    .subscribe((sensordata) => {
      this.roomData = sensordata.data;
      console.log(this.roomData);
    });
  }*/
  //end


  /* getFullRoomData(): Observable<{fullData: any[]}> {
    return this.http.get<{fullData: any[]}>('http://localhost:3000/api/fulldata'); // war any[]  <{sensorData: any[], roomData: any[]}>
  } */

  interval
  getFullRoomData(): Observable<{fullData: any[]}> {
    return this.http.get<{fullData: any[]}>('http://localhost:3000/api/fulldata'); // war any[]  <{sensorData: any[], roomData: any[]}>
  }

  getDataUpdateListener() {
    return this.dataUpdated.asObservable();
  }


  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error!');
  }


  saveRoom(deviceName: string, roomName: string, lowerTempLimit: number, upperTempLimit: number, lowerHumiLimit: number, upperHumiLimit: number, message: boolean, id: string){
    const roomData: any = {
      id: id,
      deviceId: deviceName,
      roomName: roomName,
      lowerTempLimit: lowerTempLimit,
      upperTempLimit: upperTempLimit,
      lowerHumiLimit: lowerHumiLimit,
      upperHumiLimit: upperHumiLimit,
      message : message
    };

    //Post roomData to NodeJS
    return this.http.post<{message: string}>('http://localhost:3000/api/create-room', roomData);
  }



  // Raum-Sensor Belegung speichern Yannik
  saveRoomInfo(deviceName: string, roomName: string, lowerLimit: number, upperLimit: number) {
    const roomData: any = {deviceName: deviceName,
                                roomName: roomName,
                                lowerLimit: lowerLimit,
                                upperLimit: upperLimit,
                                timestamp: Math.floor((Date.now() / 1000) - 7)};

    // Später ///////////////////////////////////////////////////////////////////
    //this.dataUpdated.next([... this.fullData]);
    /////////////////////////////////////////////////////////////////////////////
    return this.http.post<{message: string}>('http://localhost:3000/api/create-room-yannik', roomData);

  }
}
