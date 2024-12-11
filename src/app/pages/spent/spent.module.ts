import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpentRoutingModule } from './spent-routing.module';  // Importa el módulo de rutas para gastos
import { ListComponent } from './list/list.component';         // Asegúrate de tener este componente de lista
import { ManageSpentComponent } from './manage/manage.component';  // Componente para gestionar gastos
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,                  // Componente para listar los gastos
    ManageSpentComponent            // Componente para crear/actualizar gastos
  ],
  imports: [
    CommonModule,                   // Importa CommonModule
    SpentRoutingModule,             // Importa las rutas para la gestión de gastos
    ReactiveFormsModule             // Importa ReactiveFormsModule para trabajar con formularios reactivos
  ]
})
export class SpentModule { }
