import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageRestaurantComponent } from './manage/manage.component';  
const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageRestaurantComponent },  
  { path: "update/:id", component: ManageRestaurantComponent }, 
  {path: "delete/:id", component: ManageRestaurantComponent},
  { path: "view/:id", component: ManageRestaurantComponent }   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RestaurantRoutingModule { }
