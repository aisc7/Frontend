import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorRoutingModule } from './administrator-routing.module';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageAdministratorComponent } from './manage/manage.component';

@NgModule({
  declarations: [
    ListComponent,
    ManageAdministratorComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdministratorModule { }
