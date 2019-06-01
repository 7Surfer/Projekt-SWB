import { FloorplanComponent } from './floorplan/floorplan.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SensorBoxComponent } from './sensor-box/sensor-box.component';
import { WarningBoxComponent } from './warning-box/warning-box.component';
import { DataListTestComponent } from './data-list-test/data-list-test.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainPageComponent } from './display-components/main-page/main-page.component';
import { CreateRoomComponent } from './create-room/create-room.component';

const routes: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'data', component: DataListTestComponent },
  {path: 'create-room', component: CreateRoomComponent },
  {path: 'home', component: FloorplanComponent},

  {path: '404', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/404'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
