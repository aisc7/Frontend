import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';   // Componente para listar los seguros
import { ManageSeguroComponent } from './manage/manage.component';  // Componente para crear o editar seguros

const routes: Routes = [
  { path: 'list', component: ListComponent },               // Ruta para listar los seguros
  { path: 'create', component: ManageSeguroComponent },     // Ruta para crear un seguro
  { path: 'update/:id', component: ManageSeguroComponent }, // Ruta para actualizar un seguro específico
  {path: 'delete/:id', component: ManageSeguroComponent},   // Ruta para eliminar un seguro específico
  { path: 'view/:id', component: ManageSeguroComponent },    // Ruta para ver los detalles de un seguro específico
  { path: 'filterByVehiculo/:id', component: ListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configura las rutas hijas para la gestión de seguros
  exports: [RouterModule]                     // Exporta el RouterModule para que esté disponible en el módulo principal
})
export class SeguroRoutingModule { }
