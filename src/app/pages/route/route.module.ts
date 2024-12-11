import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouteRoutingModule } from './route-routing.module';
import { ListComponent } from './list/list.component';  // Asegúrate de tener este componente de lista
import { ManageRouteComponent } from './manage/manage.component';  // Asegúrate de que este componente esté bien importado
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent,
    ManageRouteComponent  // Declaración del componente de gestión de rutas
  ],
  imports: [
    CommonModule,
    RouteRoutingModule,  // Importa el módulo de rutas
    ReactiveFormsModule   // Importa ReactiveFormsModule para trabajar con formularios reactivos
  ]
})
export class RouteModule { }
