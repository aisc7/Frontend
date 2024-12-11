import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';               // Componente para listar vehículos
import { ManageVehicleComponent } from './manage/manage.component'; // Componente para crear o editar un vehículo

const routes: Routes = [
  { path: "list", component: ListComponent },                       // Ruta para listar vehículos
  { path: "create", component: ManageVehicleComponent },            // Ruta para crear un vehículo
  { path: "update/:id", component: ManageVehicleComponent },        // Ruta para actualizar un vehículo específico
  {path : "delete/:id", component: ManageVehicleComponent},         // Ruta para eliminar un vehículo específico
  { path: "view/:id", component: ManageVehicleComponent }           // Ruta para ver los detalles de un vehículo específico
];

@NgModule({
  imports: [RouterModule.forChild(routes)],   // Configura las rutas hijas para la gestión de vehículos
  exports: [RouterModule]                     // Exporta el RouterModule para que esté disponible en el módulo principal
})
export class VehicleRoutingModule { }
