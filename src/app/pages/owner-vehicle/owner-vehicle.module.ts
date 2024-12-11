import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { OwnerVehicleRoutingModule } from './owner-vehicle-routing.module';
import { ManageOwnerVehicleComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    ManageOwnerVehicleComponent, // Corregido el nombre
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    OwnerVehicleRoutingModule
  ]
})
export class OnwerVehicleModule { }
