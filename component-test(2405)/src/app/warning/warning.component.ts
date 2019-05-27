import { Component} from '@angular/core';

export interface PeriodicElement {
  roomName: string;
  warningText: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {roomName: 'Raum 1', warningText: 'Fehlertext'},
  {roomName: 'Raum 2', warningText: 'Fehlertext'}
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
  
export class WarningComponent {
  displayedColumns: string[] = ['roomName', 'warningText'];
  dataSource = ELEMENT_DATA;

  data = [
    {id: 'Raum1', description: 'Test1', },
    {id: 'Raum2', description: 'Test2', },
    {id: 'Raum3', description: 'Test3', },
    {id: 'Raum4', description: 'Test4', },
    {id: 'Raum5', description: 'Test5', },
    {id: 'Raum6', description: 'Test6', },
    {id: 'Raum7', description: 'Test7', },
    {id: 'Raum8', description: 'Test8', },
    {id: 'Raum9', description: 'Test9', },
  ]
}
