import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

export interface raspberrys {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css'],
})

export class CreateRoomComponent implements OnInit {
  form: FormGroup;

  raspberrys = [
    {value: 'rasp1', viewValue: '1'},
    {value: 'rasp2', viewValue: '2'},
    {value: 'rasp3', viewValue: '3'}
  ];
  private new_room = false;

  onSubmit() {
    this.new_room = false;
  }

  constructor(private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.form = this.formBuilder.group({
      room_name: [null, [Validators.required, Validators.minLength(1)]],
    });
  }
}
