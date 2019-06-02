import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-temp-hum-detail',
  templateUrl: './temp-hum-detail.component.html',
  styleUrls: ['./temp-hum-detail.component.css']
})
export class TempHumDetailComponent implements OnInit {

  constructor() { }

  data = [
    {id: 'Raum1', temperature: "17", humidity: "40"}
  ]

  ngOnInit() {
  }

}