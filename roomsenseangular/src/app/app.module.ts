import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { WarningBoxComponent } from './warning-box/warning-box.component';
import { SensorBoxComponent } from './sensor-box/sensor-box.component';
import { MainBoxComponent } from './main-box/main-box.component';
import { TempHumDetailComponent } from './room-details/temp-hum-detail/temp-hum-detail.component';
import { DateTimeComponent } from './room-details/date-time/date-time.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import {
        MatToolbarModule,
        MatButtonModule,
        MatExpansionModule} from '@angular/material';
import { DataListTestComponent } from './data-list-test/data-list-test.component';
import { SensorDataService } from './services/sensor-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    WarningBoxComponent,
    SensorBoxComponent,
    MainBoxComponent,
    TempHumDetailComponent,
    DateTimeComponent,
    DataListTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SensorDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
