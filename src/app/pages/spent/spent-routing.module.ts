import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';               // Componente para listar los gastos
import { ManageSpentComponent } from './manage/manage.component';     // Componente para crear o editar un gasto

const routes: Routes = [
  { path: "list", component: ListComponent },                       // Ruta para listar los gastos
  { path: "create", component: ManageSpentComponent },              // Ruta para crear un gasto
  { path: "update/:id", component: ManageSpentComponent },          // Ruta para actualizar un gasto específico
  {path : "delete/:id", component: ManageSpentComponent},           // Ruta para eliminar un gasto específico
  { path: "view/:id", component: ManageSpentComponent }             // Ruta para ver los detalles de un gasto específico
];

@NgModule({
  imports: [RouterModule.forChild(routes)],   // Configura las rutas hijas para la gestión de gastos
  exports: [RouterModule]                     // Exporta el RouterModule para que esté disponible en el módulo principal
})
export class SpentRoutingModule { }
