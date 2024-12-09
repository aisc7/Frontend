import { Routes } from "@angular/router";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { AdminLayoutComponent } from "./admin-layout.component";

export const AdminLayoutRoutes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      { path: "", redirectTo: "dashboard", pathMatch: "full" },
      { path: "dashboard", component: DashboardComponent },
      {
        path: "administrador",
        loadChildren: () =>
          import("../../pages/administrator/administrator.module").then(
            (m) => m.AdministratorModule
          ),
      },
      {
        path: "company",
        loadChildren: ()=> import("../../pages/company/company.module").then(m => m.CompanyModule)
      }
    ],
  },
];
