import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryProductRoutingModule } from './category-product-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CategoryProductRoutingModule
  ]
})
export class CategoryProductModule { }
