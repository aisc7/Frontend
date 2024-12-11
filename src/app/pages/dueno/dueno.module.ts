import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DuenoRoutingModule } from './dueno-routing.module';
import { ManageDuenoComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    ManageDuenoComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    DuenoRoutingModule,
    ReactiveFormsModule
  ]
})
export class DuenoModule { }