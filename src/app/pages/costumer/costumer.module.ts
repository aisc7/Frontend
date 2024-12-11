import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './costumer-routing.module';
import { ManageCustomerComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageCustomerComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
   ReactiveFormsModule
  ]
})
export class CostumerModule { }
