import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-scrollable-list',
  templateUrl: './scrollable-list.component.html',
  styleUrls: ['./scrollable-list.component.css']
})
export class ScrollableListComponent implements OnInit {

  constructor() { }

  public data = [{"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.65,"timestamp":1558370924},
  {"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.67,"timestamp":1558370918},
  {"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.68,"timestamp":1558370913},
  {"deviceId":"raspberryLuca","temperature":25.75,"humidity":35.73,"timestamp":1558370908},
  {"deviceId":"raspberryLuca","temperature":25.75,"humidity":35.74,"timestamp":1558370903},
  {"deviceId":"raspberryLuca","temperature":25.76,"humidity":35.78,"timestamp":1558370897}];

  ngOnInit() {

  }

}
