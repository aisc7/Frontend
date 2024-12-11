import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';                        // Componente para listar los conductores de vehículos
import { ManageVehiculoDriverComponent } from './manage/manage.component';   // Componente para crear o editar un conductor de vehículo

const routes: Routes = [
  { path: "list", component: ListComponent },                               // Ruta para listar los conductores de vehículos
  { path: "create", component: ManageVehiculoDriverComponent },            // Ruta para crear un conductor de vehículo
  { path: "update/:id", component: ManageVehiculoDriverComponent },        // Ruta para actualizar un conductor específico
  {path : "delete/:id", component: ManageVehiculoDriverComponent},         // Ruta para eliminar un conductor específico
  { path: "view/:id", component: ManageVehiculoDriverComponent }           // Ruta para ver los detalles de un conductor de vehículo específico
];

@NgModule({
  imports: [RouterModule.forChild(routes)],   // Configura las rutas hijas para la gestión de conductores de vehículos
  exports: [RouterModule]                     // Exporta el RouterModule para que esté disponible en el módulo principal
})
export class VehicleDriverRoutingModule { }
