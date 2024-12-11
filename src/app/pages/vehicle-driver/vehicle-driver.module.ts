import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleDriverRoutingModule } from './vehicle-driver-routing.module';  // Importa el módulo de rutas para conductores de vehículos
import { ListComponent } from './list/list.component';                         // Componente para listar los conductores de vehículos
import { ManageVehiculoDriverComponent } from './manage/manage.component';    // Componente para gestionar los conductores de vehículos
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,                              // Componente para listar los conductores de vehículos
    ManageVehiculoDriverComponent              // Componente para gestionar un conductor de vehículo (crear/actualizar)
  ],
  imports: [
    CommonModule,                               // Importa CommonModule
    VehicleDriverRoutingModule,                 // Importa las rutas para la gestión de conductores de vehículos
    ReactiveFormsModule                         // Importa ReactiveFormsModule para trabajar con formularios reactivos
  ]
})
export class VehicleDriverModule { }
