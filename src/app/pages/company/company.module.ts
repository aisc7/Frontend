import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompanyRoutingModule } from './company-routing.module';
import { ManageCompanyComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageCompanyComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
   ReactiveFormsModule
  ]
})
export class CompanyModule { }
