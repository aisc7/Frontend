import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShiftRoutingModule } from './shift-routing.module';  // Importa el módulo de rutas para turnos
import { ListComponent } from './list/list.component';   // Asegúrate de tener este componente de lista
import { ManageShiftComponent } from './manage/manage.component';  // Componente para gestionar turnos
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,                  // Componente para listar turnos
    ManageShiftComponent            // Componente para crear/actualizar turnos
  ],
  imports: [
    CommonModule,                   // Importa CommonModule
    ShiftRoutingModule,             // Importa las rutas del turno
    ReactiveFormsModule             // Importa ReactiveFormsModule para trabajar con formularios reactivos
  ]
})
export class ShiftModule { }
