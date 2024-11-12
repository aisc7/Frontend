import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicioRoutingModule } from './servicio-routing.module';
import { ListComponent } from './list/list.component';
import { ManagerComponent } from './manager/manager.component';


@NgModule({
  declarations: [
    ListComponent,
    ManagerComponent
  ],
  imports: [
    CommonModule,
    ServicioRoutingModule
  ]
})
export class ServicioModule { }
