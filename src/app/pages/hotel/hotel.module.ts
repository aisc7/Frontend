import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotelRoutingModule } from './hotel-routing.module';
import { ManageHotelComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageHotelComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    HotelRoutingModule,
   ReactiveFormsModule
  ]
})
export class HotelModule { }
