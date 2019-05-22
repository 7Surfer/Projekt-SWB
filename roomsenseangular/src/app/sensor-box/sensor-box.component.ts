
import { Component } from '@angular/core';

@Component({
  selector: 'app-sensor-box',
  templateUrl: './sensor-box.component.html',
  styleUrls: ['./sensor-box.component.css']
})
export class SensorBoxComponent {
  rooms = [
    { id: 'Raum 4', description: 'Temperatur: 21.5°C / Luftfeuchtigkeit:79%', warning: 'Fehlermeldung' },
    { id: 'Raum 5', description: 'Temperatur: 29°C / Luftfeuchtigkeit: 10%', warning: 'Fehlermeldung' },
    { id: 'Raum 6', description: 'Temperatur: 20°C / Luftfeuchtigkeit: 67%', warning: 'Fehlermeldung' }
  ];
}
