import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageBatchComponent } from './manage/manage.component'; // Componente para gestionar un lote
import { ListComponent } from './list/list.component';

const routes: Routes = [
  { path: "list", component: ListComponent },              // Ruta para listar lotes
  { path: "create", component: ManageBatchComponent },          // Ruta para crear un lote
  { path: "update/:id", component: ManageBatchComponent },      // Ruta para actualizar un lote
  { path: "delete/:id", component: ManageBatchComponent },      // Ruta para eliminar un lote
  { path: "view/:id", component: ManageBatchComponent },        // Ruta para ver detalles de un lote
  { path: "filterByRoute/:id", component:ListComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule { }