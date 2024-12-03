import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehicleDriverRoutingModule } from './vehicle-driver-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    VehicleDriverRoutingModule,
    ReactiveFormsModule
  ]
})
export class VehicleDriverModule { }