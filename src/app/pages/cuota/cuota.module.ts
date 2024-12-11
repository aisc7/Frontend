import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuotaRoutingModule } from './cuota-routing.module';
import { ManageCuotaComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageCuotaComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    CuotaRoutingModule,
   ReactiveFormsModule
  ]
})
export class CuotaModule { }
