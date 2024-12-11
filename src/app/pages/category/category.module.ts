import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { ManageCategoryComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageCategoryComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
   ReactiveFormsModule
  ]
})
export class CategoryModule { }
