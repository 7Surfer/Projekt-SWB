import { Component, OnInit, NgModule } from '@angular/core';

export interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
})

export class CreateRoomComponent implements OnInit {

  raspberrys = [
    {value: 'rasp1', viewValue: '1'},
    {value: 'rasp2', viewValue: '2'},
    {value: 'rasp3', viewValue: '3'}
  ];
  private isButtonVisible = false;
  constructor() { }
  ngOnInit() {
  }
}
