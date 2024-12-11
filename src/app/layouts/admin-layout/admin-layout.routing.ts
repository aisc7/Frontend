import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
// import { AuthenticatedGuard } from 'src/app/guards/authenticated.guard';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent }, 
    {
  
            path: 'administrador',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/administrator/administrator.module').then(m => m.AdministratorModule)
                }
            ]
        },
        {
            path: 'orden-ruta-direccion',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/addre-route-order/addre-route-order.module').then(m => m.AddreRouteOrderModule)
                }
            ]
        },
        {
            path: 'direccion',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/address/address.module').then(m => m.AddressModule)
                }
            ]
        },
        {
            path: 'lote',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/batch/batch.module').then(m => m.BatchModule)
                }
            ]
        },
        {
            path: 'categoria',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/category/category.module').then(m => m.CategoryModule)
                }
            ]
        },
        {
            path: 'categoria-producto',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/category-product/category-product.module').then(m => m.CategoryProductModule)
                }
            ]
        },
        {
            path: 'empresa',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/company/company.module').then(m => m.CompanyModule)
                }
            ]
        },
        {
            path: 'conductor',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/conductor/conductor.module').then(m => m.ConductorModule)
                }
            ]
        },
        {
            path: 'contrato',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/contract/contract.module').then(m => m.ContractModule)
                }
            ]
        },
        {
            path: 'cliente',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/costumer/costumer.module').then(m => m.CostumerModule)
                }
            ]
        },
        {
            path: 'cuota',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/cuota/cuota.module').then(m => m.CuotaModule)
                }
            ]
        },
        {
            path: 'departamento',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/department/department.module').then(m => m.DepartmentModule)
                }
            ]
        },
        {
            path: 'centro-distribucion',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/distribution-center/distribution-center.module').then(m => m.DistributionCenterModule)
                }
            ]
        },
        {
            path: 'dueno',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/dueno/dueno.module').then(m => m.DuenoModule)
                }
            ]
        },
        {
            path: 'factura',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/factura/factura.module').then(m => m.FacturaModule)
                }
            ]
        },
        {
            path: 'hotel',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/hotel/hotel.module').then(m => m.HotelModule)
                }
            ]
        },
        {
            path: 'municipio',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/municipality/municipality.module').then(m => m.MunicipalityModule)
                }
            ]
        },
        {
            path: 'persona-natural',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/natural-person/natural-person.module').then(m => m.NaturalPersonModule)
                }
            ]
        },
        {
            path: 'operacion',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/operation/operation.module').then(m => m.OperationModule)
                }
            ]
        },
        {
            path: 'vehiculo-dueno',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/owner-vehicle/owner-vehicle.module').then(m => m.OnwerVehicleModule)
                }
            ]
        },
        {
            path: 'producto',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/product/product.module').then(m => m.ProductModule)
                }
            ]
        },
        {
            path: 'restaurante',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/restaurant/restaurant.module').then(m => m.RestaurantModule)
                }
            ]
        },
        {
            path: 'ruta',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/route/route.module').then(m => m.RouteModule)
                }
            ]
        },
        {
            path: 'seguro',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/seguro/seguro.module').then(m => m.SeguroModule)
                }
            ]
        },
        {
            path: 'servicio',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/servicio/servicio.module').then(m => m.ServicioModule)
                }
            ]
        },
        {
            path: 'turno',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/shift/shift.module').then(m => m.ShiftModule)
                }
            ]
        },
        {
            path: 'gasto',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/spent/spent.module').then(m => m.SpentModule)
                }
            ]
        },
        {
            path: 'chofer',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/vehicle-driver/vehicle-driver.module').then(m => m.VehicleDriverModule)
                }
            ]
        },
        {
            path: 'vehiculo',
            children: [
                {
                    path: '',
                    loadChildren: () => import('../../pages/vehiculo/vehiculo.module').then(m => m.VehicleModule)
                }
            ]
        }
    ];
