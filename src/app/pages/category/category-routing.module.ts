import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageCategoryComponent } from './manage/manage.component'; // Componente de gestión de categorías
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path: "list", component: ListComponent },                // Ruta para listar categorías
  { path: "create", component: ManageCategoryComponent },             // Ruta para crear categoría
  { path: "update/:id", component: ManageCategoryComponent },         // Ruta para actualizar categoría
  {path: "delete/:id", component: ManageCategoryComponent},           // Ruta para eliminar categoría
  { path: "view/:id", component: ManageCategoryComponent },           // Ruta para ver detalles de una categoría
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
