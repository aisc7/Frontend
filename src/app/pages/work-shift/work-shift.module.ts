import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkShiftRoutingModule } from './work-shift-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    WorkShiftRoutingModule
  ]
})
export class WorkShiftModule { }
