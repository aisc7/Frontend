import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BatchRoutingModule } from './batch-routing.module';
import { ManageBatchComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageBatchComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    BatchRoutingModule,
   ReactiveFormsModule
  ]
})
export class BatchModule { }
