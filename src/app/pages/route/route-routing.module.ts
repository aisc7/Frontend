import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';   // Componente de lista de rutas
import { ManageRouteComponent } from './manage/manage.component';  // Componente para gestionar rutas

const routes: Routes = [
  { path: 'list', component: ListComponent },               // Ruta para listar las rutas
  { path: 'create', component: ManageRouteComponent },      // Ruta para crear una nueva ruta
  { path: 'update/:id', component: ManageRouteComponent },  // Ruta para actualizar una ruta existente
  {path: 'delete/:id', component: ManageRouteComponent},    // Ruta para eliminar una ruta
  { path: 'view/:id', component: ManageRouteComponent }     // Ruta para ver los detalles de una ruta
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configura las rutas hijas
  exports: [RouterModule]                     // Exporta el RouterModule para que esté disponible en el módulo principal
})
export class RouteRoutingModule { }
