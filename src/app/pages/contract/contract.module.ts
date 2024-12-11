import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConductorRoutingModule } from './contract-routing.module';
import { ManageContractComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ManageContractComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ConductorRoutingModule,
   ReactiveFormsModule
  ]
})
export class ContractModule { }
