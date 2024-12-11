import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NaturalPersonRoutingModule } from './natural-person-routing.module';
import { ManageNaturalPersonComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    ManageNaturalPersonComponent, 
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NaturalPersonRoutingModule
  ]
})
export class NaturalPersonModule { }
