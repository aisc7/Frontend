import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehicleRoutingModule } from './vehiculo-routing.module';  // Importa el módulo de rutas para vehículos
import { ListComponent } from './list/list.component';            // Componente para listar vehículos
import { ManageVehicleComponent } from './manage/manage.component'; // Componente para gestionar vehículos (crear/actualizar)
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,                              // Componente para listar vehículos
    ManageVehicleComponent                      // Componente para gestionar un vehículo (crear/actualizar)
  ],
  imports: [
    CommonModule,                               // Importa CommonModule
    VehicleRoutingModule,                       // Importa las rutas para la gestión de vehículos
    ReactiveFormsModule                         // Importa ReactiveFormsModule para trabajar con formularios reactivos
  ]
})
export class VehicleModule { }
