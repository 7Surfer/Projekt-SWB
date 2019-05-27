import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warning-box',
  templateUrl: './warning-box.component.html',
  styleUrls: ['./warning-box.component.css']
})
export class WarningBoxComponent {

  constructor(private router: Router) {}

  rooms = [
    { id: 'Raum 1', description: 'Temperatur: 22°C / Luftfeuchtigkeit: 50%', warning: 'Temperatur überschreitet Grenzwert' },
    { id: 'Raum 2', description: 'Temperatur: 25°C / Luftfeuchtigkeit: 54%', warning: 'Fehlermeldung'},
    { id: 'Raum 3', description: 'Temperatur: 26°C / Luftfeuchtigkeit: 23%', warning: 'Fehlermeldung'},
    // { id: 'Raum 4', description: 'Temperatur: 21.5°C / Luftfeuchtigkeit:79%', warning: 'Fehlermeldung'},
    // { id: 'Raum 5', description: 'Temperatur: 29°C / Luftfeuchtigkeit: 10%', warning: 'Fehlermeldung'},
    // { id: 'Raum 6', description: 'Temperatur: 20°C / Luftfeuchtigkeit: 67%', warning: 'Fehlermeldung'}
  ];

  onRoomClicked() {
    this.router.navigate(['rooms']);
  }

}



