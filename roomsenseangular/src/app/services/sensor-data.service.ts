import { SensorData } from './../models/SensorData.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SensorDataService {
  constructor(private http: HttpClient) { }

  private data: SensorData[] = [];
  private dataUpdated = new Subject<SensorData[]>();

  getData() {
    this.http.get<{message: string, data: SensorData[]}>('http://localhost:3000/api/data')
      .subscribe((sensorData) => {
        this.data = sensorData.data;
        this.dataUpdated.next([...this.data]); // Damit data im Service nicht verändert werden kann
      });
  }

  getDataUpdateListener() {
    return this.dataUpdated.asObservable();
  }


  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || 'Server Error!')
  }
}
