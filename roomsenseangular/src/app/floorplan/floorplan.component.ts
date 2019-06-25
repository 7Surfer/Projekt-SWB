import { SensorDataService } from './../services/sensor-data.service';
import { Component, OnInit } from '@angular/core';
import { SensorData } from '../models/SensorData.model';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-floorplan',
  templateUrl: './floorplan.component.html',
  styleUrls: ['./floorplan.component.css']
})
export class FloorplanComponent implements OnInit {

  constructor(public sensorDataService: SensorDataService) { }

  searchBarInput: string;
  data: SensorData[] = [];
  fullData: any[] = [];
  private fullDataSubscription: Subscription;
  getDataInterval: any;


  dummyData = [
    {id: 'Raum1', temperature: "2°C", humidity: "40%"},
    {id: 'Raum2', temperature: "1°C", humidity: "40%"},
    {id: 'Raum3', temperature: "2°C", humidity: "50%"},
    {id: 'Raum4', temperature: "5°C", humidity: "40%"},
    {id: 'Raum5', temperature: "2°C", humidity: "60%"},
    {id: 'Raum6', description: 'Test6', },
    {id: 'Raum7', description: 'Test7', },
    {id: 'Raum8', description: 'Test8', },
    {id: 'Raum9', description: 'Test9', },
  ]

  ngOnInit() {

    // Subject subscriben damit neueste Änderungen empfangen werden
    this.fullDataSubscription = this.sensorDataService.getFullDataUpdateListener().subscribe((updatedFullData: any[]) => {
      //console.log('Neuer Log im Floorplan Component: ' + JSON.stringify(updatedFullData));
      this.fullData = updatedFullData;
    });

    // Bei Aufruf einmal neueste Daten abrufen, um Wartezeit auf neues Intervall zu verhindern, dann nach Subject richten
    this.sensorDataService.getFullRoomData();

  }

  /* getFullRoomData(): void {
    this.sensorDataService.getFullRoomData()
      .subscribe(fetchedFullData => {
        this.fullData = fetchedFullData.fullData;
      });
  } */


  ngOnDestroy(): void {
    this.fullDataSubscription.unsubscribe();
    clearInterval(this.getDataInterval);
    console.log('Floorplan Intervall zerstört');

  }



}

