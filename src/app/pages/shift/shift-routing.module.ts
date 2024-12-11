import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';   // Componente para listar los turnos
import { ManageShiftComponent } from './manage/manage.component';  // Componente para crear o editar turnos

const routes: Routes = [
  { path: "list", component: ListComponent },               // Ruta para listar los turnos
  { path: "create", component: ManageShiftComponent },      // Ruta para crear un turno
  { path: "update/:id", component: ManageShiftComponent },  // Ruta para actualizar un turno específico
  {path : "delete/:id", component: ManageShiftComponent},   // Ruta para eliminar un turno específico
  { path: "view/:id", component: ManageShiftComponent }     // Ruta para ver los detalles de un turno específico
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configura las rutas hijas para la gestión de turnos
  exports: [RouterModule]                     // Exporta el RouterModule para que esté disponible en el módulo principal
})
export class ShiftRoutingModule { }
