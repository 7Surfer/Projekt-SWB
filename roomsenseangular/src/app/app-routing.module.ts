import { SensorBoxComponent } from './sensor-box/sensor-box.component';
import { WarningBoxComponent } from './warning-box/warning-box.component';
import { DataListTestComponent } from './data-list-test/data-list-test.component';
import { HeaderComponent } from './header/header.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: '', component: WarningBoxComponent},
  //{path: '', component: SensorBoxComponent, outlet: 'secondary'},
  {path: 'data', component: DataListTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
