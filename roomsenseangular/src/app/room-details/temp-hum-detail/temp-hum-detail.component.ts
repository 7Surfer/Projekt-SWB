import { SensorDataService } from './../../services/sensor-data.service';
import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
/* import * as Chart from 'chart.js'; */
Chart.defaults.global.defaultFontFamily = "Open Sans";


@Component({
  selector: 'app-temp-hum-detail',
  templateUrl: './temp-hum-detail.component.html',
  styleUrls: ['./temp-hum-detail.component.css']
})
export class TempHumDetailComponent implements OnInit, OnDestroy {

  constructor(private sensorDataService: SensorDataService, private route: ActivatedRoute) { }

  humStatisticData: any[];
  tempStatisticData: any[] = [0, 0, 0, 0, 0];
  timeStatisticData: any[];
  fullData: any[] = [];
  clickedDeviceData: any;
  private fullDataSubscription: Subscription;
  clickedDeviceId: any;
  convertedTimes: any[];
  lastUpdated:any;
  day: any;
  month: any;
  year: any;
  hour: any;
  minute: any;
  second: any;


  // Chart JS
  minValueFromStatistics: any;
  maxValueFromStatistics: any;

  // ng2-chart

  // Temp Chart ///////////////////////////////////////////////////////////////////////////////////////
  public tempChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false,
          max: this.minValueFromStatistics,
          min: this.maxValueFromStatistics,
        }
      }],
      xAxes: [{
          gridLines: {
          display: false
        }
      }]
    },
    legend: {
      position: 'top',
      labels: {
        boxWidth: 7,
        fontSize: 12,
        fontStyle: 'normal',
        usePointStyle: true
      }
    }
  };

  public tempChartLabels = this.convertedTimes;

  public tempChartType = 'line';

  public chartLegend = 'true';

  public tempChartData = [
    {data: this.tempStatisticData, label: 'Temperatur [°C]', backgroundColor: '#7EBFDB', borderColor: '#0082BB', pointBackgroundColor: '#0082BB'}
  ];

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  // Hum Chart ///////////////////////////////////////////////////////////////////////////////////////////
  public humChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: false,
          max: this.minValueFromStatistics,
          min: this.maxValueFromStatistics
        }
      }],
      xAxes: [{
        gridLines: {
        display: false
      }
    }]
    },
    legend: {
      position: 'top',
      labels: {
        boxWidth: 7,
        fontSize: 12,
        fontStyle: 'normal',
        usePointStyle: true
      }
    }
  };

  public humChartLabels =  this.convertedTimes //this.convertedTimes;

  public humChartType = 'line';

  public humChartLegend = 'true';

  public humChartData = [
    {data: this.tempStatisticData, label: 'Luftfeuchtigkeit [%]', backgroundColor: '#7EBFDB', borderColor: '#0082BB', pointBackgroundColor: '#0082BB'}
  ];
  //////////////////////////////////////////////////////////////////////////////////////////////////////////


  ngOnInit(): void {

    this.fullDataSubscription = this.sensorDataService.getFullDataUpdateListener().subscribe((updatedFullData: any[]) => {
      this.fullData = updatedFullData;

      let index = this.getIndexOfSelectedDevice(updatedFullData, this.clickedDeviceId);
      this.clickedDeviceData = updatedFullData[index];
      let date = new Date(this.clickedDeviceData._ts * 1000);
      this.lastUpdated = date.toLocaleString().toString().replace(',', '');
    });

    // Bei Initialisierung um Warten auf Intervall zu vermeiden
    this.sensorDataService.getFullRoomData();

    this.route.paramMap.subscribe(params => {
      this.clickedDeviceId = params.get('deviceId');
      this.getStatistic(this.clickedDeviceId);
    });


    // Daten für Statistiken abrufen
    this.getStatistic(this.clickedDeviceId);
  }


  getIndexOfSelectedDevice(array: any[], deviceId: string) {
    let nameArray = [];
    for(let i = 0; i < array.length; i++) {
      nameArray.push(array[i].deviceId);
    }
    return nameArray.indexOf(deviceId);
  }


  // Statistiken Methode
  getStatistic(deviceId: string) {
    this.sensorDataService.getStatisticForClickedDevice(deviceId)
      .subscribe(statisticDataServer => {
        this.tempStatisticData = statisticDataServer.tempStatistic;
        this.humStatisticData = statisticDataServer.humStatistic;
        this.timeStatisticData = statisticDataServer.timeStatistic;
        this.convertedTimes = this.convertTimestamps(this.timeStatisticData);
        // console.log('Timestamps: ' + JSON.stringify(this.timeStatisticData));
        // Chart erst dann zeichnen wenn Werte da sind
        this.updateTempData(this.tempStatisticData);
        this.updateHumData(this.humStatisticData);
     });
  }

  convertTimestamps(timestampArray) {
    let convertedTimestamps = [];
    timestampArray.forEach(ts => {
      let date = new Date(ts * 1000);
      let time = date.toLocaleTimeString();
      convertedTimestamps.push(time);

    });
    return convertedTimestamps;
  }

  updateTempData(data: any[]) {
    //console.log('Chart updated!');
    this.tempChartData[0].data = data;
    this.tempChartOptions.scales.yAxes[0].ticks.max = (Math.max.apply(Math, data)) + 1.0;
    this.tempChartOptions.scales.yAxes[0].ticks.min = (Math.min.apply(Math, data)) - 1.0;
    this.tempChartLabels = this.convertedTimes;
  }

  updateHumData(data: any[]) {
    //console.log('Chart updated!');
    this.humChartData[0].data = data;
    this.humChartOptions.scales.yAxes[0].ticks.max = (Math.max.apply(Math, data)) + 5.0;
    this.humChartOptions.scales.yAxes[0].ticks.min = (Math.min.apply(Math, data)) - 5.0;
    this.humChartLabels = this.convertedTimes;

  }


    ngOnDestroy(): void {
      this.fullDataSubscription.unsubscribe();
    }



}
