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
  private fullDataUpdated = new Subject<any[]>();
  private dataUpdated = new Subject<any []>();
  constructor(private http: HttpClient) { }

  data: SensorData[] = [];
  roomData: RoomSettings[] = [];


  // Später vielleicht
  fullData: any[] = [];
  clickedRoom: string;

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
        console.log('Daten vom Server erhalten!');
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
  getallRooms() {
    this.http.get<{message: string, data: any}>('http://localhost:3000/api/allrooms')
    .subscribe((sensordata) => {
      this.data = sensordata.data;
      this.dataUpdated.next([...this.data]);
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


  /*  getFullRoomData(): Observable<{fullData: any[]}> {
    return this.http.get<{fullData: any[]}>('http://localhost:3000/api/fulldata'); // war any[]  <{sensorData: any[], roomData: any[]}>
  } */

  getFullRoomData() {
    this.http.get<{fullData: any[]}>('http://localhost:3000/api/fulldata') // war any[]  <{sensorData: any[], roomData: any[]}>
      .subscribe(fetchedFullData => {
        //console.log('getFullRommData im Service ausgeführt');
        this.fullData = fetchedFullData.fullData;
        this.fullDataUpdated.next([...this.fullData]);
      });
  }

  getDataUpdateListener() {
    return this.dataUpdated.asObservable();
  }
  getFullDataUpdateListener() {
    return this.fullDataUpdated.asObservable();
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

  deleteRoom(deviceName: string, roomName: string, lowerTempLimit: number, upperTempLimit: number, lowerHumiLimit: number, upperHumiLimit: number, message: boolean, id: string){
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
    return this.http.post<{message: string}>('http://localhost:3000/api/delete-room', roomData);
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


  storeClickedRoom(clickedRoom: string) {
    this.clickedRoom = clickedRoom;
    console.log('Click auf : ' + this.clickedRoom);
  }

  getClickedRoom() {

  }



  // Daten für Statistiken
  getStatisticForClickedDevice(deviceId: string): Observable<any> {
    return this.http.get('http://localhost:3000/api/statistic/' + deviceId);
  }
}
