import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ManageHotelComponent } from './manage/manage.component'; // Adjust path accordingly

const routes: Routes = [
  { path: "list", component: ListComponent },
  { path: "create", component: ManageHotelComponent },
  { path: "view/:id", component: ManageHotelComponent },
  {path: "delete/:id", component: ManageHotelComponent},
  { path: "update/:id", component: ManageHotelComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotelRoutingModule { }