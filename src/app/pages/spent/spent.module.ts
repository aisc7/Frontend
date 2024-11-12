import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SpentRoutingModule } from './spent-routing.module';
import { ManagerComponent } from './manager/manager.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ManagerComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    SpentRoutingModule
  ]
})
export class SpentModule { }
