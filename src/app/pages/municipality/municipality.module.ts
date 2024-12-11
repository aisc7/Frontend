import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MunicipalityRoutingModule } from './municipality-routing.module';
import { ManageMunicipalityComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageMunicipalityComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    MunicipalityRoutingModule,
   ReactiveFormsModule
  ]
})
export class MunicipalityModule { }
