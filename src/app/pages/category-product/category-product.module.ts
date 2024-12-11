import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryProductRoutingModule } from './category-product-routing.module';
import { ManageCategoryProductComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageCategoryProductComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CategoryProductRoutingModule,
   ReactiveFormsModule
  ]
})
export class CategoryProductModule { }
