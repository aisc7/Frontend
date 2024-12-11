import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioRoutingModule } from './servicio-routing.module';  // Importa el módulo de rutas para servicios
import { ListComponent } from './list/list.component';   // Asegúrate de tener este componente de lista
import { ManageServicioComponent } from './manage/manage.component';  // Componente para gestionar servicios
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,                  // Componente para listar servicios
    ManageServicioComponent         // Componente para crear/actualizar servicios
  ],
  imports: [
    CommonModule,                   // Importa CommonModule
    ServicioRoutingModule,          // Importa las rutas del servicio
    ReactiveFormsModule             // Importa ReactiveFormsModule para trabajar con formularios reactivos
  ]
})
export class ServicioModule { }
