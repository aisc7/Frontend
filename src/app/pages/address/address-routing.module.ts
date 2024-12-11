import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageAddressComponent } from './manage/manage.component';
import { ListComponent } from './list/list.component';
import * as path from 'path';

const routes: Routes = [
  {path: "list", component: ListComponent },              // Ruta para listar direcciones
  { path: "create", component: ManageAddressComponent },              // Ruta para crear dirección
  { path: "update/:id", component: ManageAddressComponent },          // Ruta para actualizar dirección
  {path: "delete/:id", component: ManageAddressComponent},            // Ruta para eliminar dirección
  { path: "view/:id", component: ManageAddressComponent },            // Ruta para ver detalles de una dirección
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddressRoutingModule { }
