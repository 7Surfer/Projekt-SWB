import { Component, OnInit } from '@angular/core';
import { SensorDataService } from '../services/sensor-data.service';

@Component({
  selector: 'app-data-list-test',
  templateUrl: './data-list-test.component.html',
  styleUrls: ['./data-list-test.component.css']
})
export class DataListTestComponent implements OnInit {

  public data = [];

  constructor(private sensorDataService: SensorDataService) { }

  ngOnInit() {
    this.data = this.sensorDataService.getData();
  }

}
