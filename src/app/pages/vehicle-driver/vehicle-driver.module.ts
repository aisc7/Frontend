import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleDriverRoutingModule } from './vehicle-driver-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    VehicleDriverRoutingModule
  ]
})
export class VehicleDriverModule { }
