import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {

  constructor() { }
  
  data = [
    {id: 'Raum1', description: 'Temperatur überschreitet Grenzwert', },
    {id: 'Raum2', description: 'Fehlermeldung', },
    {id: 'Raum3', description: 'Test3', },
    {id: 'Raum4', description: 'Test4', },
    {id: 'Raum5', description: 'Test5', },
    {id: 'Raum6', description: 'Test6', },
    {id: 'Raum7', description: 'Test7', },
    {id: 'Raum8', description: 'Test8', },
    {id: 'Raum9', description: 'Test9', },
  ];

  ngOnInit() {
  }

}
