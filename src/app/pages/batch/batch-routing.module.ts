import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBatchComponent } from './manage/manage.component'; // Componente de gestión de lotes

const routes: Routes = [
  {path: "list", component: ManageBatchComponent },                   // Ruta para listar lotes
  { path: "create", component: ManageBatchComponent },                // Ruta para crear lote
  { path: "update/:id", component: ManageBatchComponent },            // Ruta para actualizar lote
  {path: "delete/:id", component: ManageBatchComponent},              // Ruta para eliminar lote
  { path: "view/:id", component: ManageBatchComponent },              // Ruta para ver detalles de un lote
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule { }
