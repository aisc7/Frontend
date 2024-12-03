import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DistributionCenterRoutingModule } from './distribution-center-routing.module';
import { ManageComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ManageComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    DistributionCenterRoutingModule,
    ReactiveFormsModule
  ]
})
export class DistributionCenterModule { }