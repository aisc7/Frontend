import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartmentRoutingModule } from './department-routing.module';
import { ManageDepartmentComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageDepartmentComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
   ReactiveFormsModule
  ]
})
export class DepartmentModule { }
