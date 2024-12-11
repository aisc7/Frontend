import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguroRoutingModule } from './seguro-routing.module';
import { ListComponent } from './list/list.component';   // Asegúrate de tener este componente de lista
import { ManageSeguroComponent } from './manage/manage.component';  // Componente para gestionar seguros
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    ManageSeguroComponent  // Declaración del componente para gestionar seguros
  ],
  imports: [
    CommonModule,
    SeguroRoutingModule,  // Importa el módulo de rutas para seguros
    ReactiveFormsModule    // Importa ReactiveFormsModule para trabajar con formularios reactivos
  ]
})
export class SeguroModule { }
