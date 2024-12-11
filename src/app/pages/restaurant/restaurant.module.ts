import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RestaurantRoutingModule } from './restaurant-routing.module';
import { ListComponent } from './list/list.component';
import { ManageRestaurantComponent } from './manage/manage.component'; // Correct path to the component

@NgModule({
  declarations: [
    ListComponent,
    ManageRestaurantComponent
  ],
  imports: [
    CommonModule,
    RestaurantRoutingModule,
    ReactiveFormsModule
  ]
})
export class RestaurantModule { }
