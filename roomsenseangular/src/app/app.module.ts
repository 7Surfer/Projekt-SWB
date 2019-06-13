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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import {
        MatToolbarModule,
        MatButtonModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatSelect,
        MatSelectModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatCardModule,
        MatSnackBarModule,} from '@angular/material';
import { DataListTestComponent } from './data-list-test/data-list-test.component';
import { SensorDataService } from './services/sensor-data.service';
import { MainPageComponent } from './display-components/main-page/main-page.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FloorplanComponent } from './floorplan/floorplan.component';
import { CreateRoomYannikComponent } from './create-room-yannik/create-room-yannik.component';
import { WarningComponent } from './room-details/warning/warning.component';
import { SearchFilterPipe } from './utils/pipes/search-filter.pipe';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SearchBarComponent,
    WarningBoxComponent,
    SensorBoxComponent,
    MainBoxComponent,
    TempHumDetailComponent,
    DataListTestComponent,
    MainPageComponent,
    CreateRoomComponent,
    PageNotFoundComponent,
    FloorplanComponent,
    CreateRoomYannikComponent,
    WarningComponent,
    SearchFilterPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    FormsModule,
    HttpClientModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatSnackBarModule,
    ChartsModule

  ],
  providers: [SensorDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
