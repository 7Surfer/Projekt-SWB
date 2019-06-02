import { SensorDataService } from './../../services/sensor-data.service';
import { SensorData } from './../../models/SensorData.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit, OnDestroy {


  private newDataSubscription: Subscription;
  newData: any;

  constructor(sensorDataService: SensorDataService) { }

  ngOnInit() {
    /* const newDataObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        count++;
      }, 1000);
    });

    this.newDataSubscription = newDataObservable.subscribe((data) => {
      console.log('Observable Data: ' + data);
      this.newData = data;
    }); */
  }

  ngOnDestroy(): void {
   /*  this.newDataSubscription.unsubscribe(); */
  }

}
