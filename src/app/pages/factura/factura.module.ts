import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacturaRoutingModule } from './factura-routing.module';
import { ManageFacturaComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageFacturaComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    FacturaRoutingModule,
   ReactiveFormsModule
  ]
})
export class FacturaModule { }
