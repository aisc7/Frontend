import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddressRoutingModule } from './address-routing.module';
import { ManageAddressComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    ManageAddressComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    AddressRoutingModule,
    ReactiveFormsModule
  ]
})
export class AddressModule { }