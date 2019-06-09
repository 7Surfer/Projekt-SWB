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

  data: SensorData[] = [];
  fullData: any[] = [];
  dataToDisplay: SensorData[];
  isLoading = false;
  isClicked = false;

  private dataSubscription: Subscription;

  constructor(public sensorDataService: SensorDataService) { }


  ngOnInit() {
    /* this.sensorDataService.getData();
    this.isLoading = true;
    this.dataSubscription = this.sensorDataService.getDataUpdateListener()
      .subscribe((sentData: SensorData []) => {
        this.isLoading = false;
        this.data = sentData;
        console.log( Array.isArray(sentData) +  'Daten: ' + sentData);
        this.dataToDisplay = JSON.parse('[' + sentData + ']');
        console.log('Data to display: ' + this.dataToDisplay[0].deviceId);
    }); */

    this.isClicked = true;


    // Einkommentieren um neueste Daten zu empfangen //////////////////////////////////////////////////////////
    /* setInterval(() => {
      console.log('Es werden Daten empfangen!');
      this.getData();
    }, 5000); */
    ////////////////////////////////////////////////////////////////////////////////////////////////////////



    /* setInterval(() => {
      console.log('Neue Daten empfangen!');
      this.getFullRoomData();
    }, 5000); */

  }

  ngOnDestroy() {
    /* this.dataSubscription.unsubscribe();
    this.dataToDisplay.length = 0; */
    this.isClicked = false;
    //console.log('Data List Test zerstöt!');
  }


  /*  getData(): void {
     this.sensorDataService.getData()
       .subscribe(fetchedData => {
         this.data = JSON.parse('[' + fetchedData + ']');
         for (let i = 0; i < this.data.length; i++) {
           // console.log('Accessed Data:' + this.data[i].deviceId);
           console.log('Stringified Data:' + JSON.stringify(this.data[i]));
         }
       });
   } */


  getFullRoomData(): void {
    this.sensorDataService.getFullRoomData()
      .subscribe(fetchedFullData => {
        /* this.fullData = JSON.parse('[' + fetchedFullData + ']'); */
        /* let fetchedFullDataDisplay = fetchedFullData; */
        // let fetchedFullDataDisplay = JSON.stringify(fetchedFullData);
        // fetchedFullDataDisplay = '[' + fetchedFullDataDisplay + ']';
        /* var keys = Object.keys(fetchedFullData);
        console.log('Keys: ' + keys);
        console.log('Sensor Data: ' + fetchedFullDataDisplay.sensorData.deviceId)
        console.log('Fetched Full Data: ' + fetchedFullDataDisplay);
        console.log('Device Id: ' + fetchedFullData[0]); */

        this.fullData = fetchedFullData.fullData;
        // console.log('Sensor Data: ' + fetchedFullData);
        // console.log('Fetched Full Data: ' + JSON.stringify(this.fullData));
        console.log(this.fullData[0].room);
        console.log(JSON.stringify(this.fullData));
      });
  }

}
