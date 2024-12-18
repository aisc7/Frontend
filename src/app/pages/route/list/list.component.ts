import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/models/route.model';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  routes: Route[];
  vehiculo_id: number;
  contract_id:number;


  constructor(private routeService: RouteService, private router: Router, private activatedRoute:ActivatedRoute) {
    console.log('Constructor');
    this.routes = [];
  }

  ngOnInit(): void {
    this.vehiculo_id = this.activatedRoute.snapshot.params['id'];
    this.contract_id = this.activatedRoute.snapshot.params['id'];
    const currentUrl = this.activatedRoute.snapshot.url.join('/');

    if(currentUrl.includes('filterByVehiculo')){
      this.filterByVehiculo();
    }else if(currentUrl.includes('filterByContract')){
      this.filterByContract();
    }else{
      this.list() //lista por defecto 
    }
  }

  list() {
    this.routeService.list().subscribe((data: any[]) => {
      this.routes = data.map(item => ({
        id: item.id,
        starting_place: item.starting_place,
        ending_place: item.ending_place,  
        distance: item.distance,
        delivery_date: item.delivery_date,
        contract_id: item.contract_id,
        vehiculo_id: item.vehiculo_id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        contract: item.contract,
        vehiculo: item.vehiculo,
        batches: item.batches,
        conductores: item.conductores,
        addrerouteorders : item.addrerouteorders
      }));
      console.log('empresa:', this.routes);
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminación',
      text: 'Está seguro que quiere eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.routeService.delete(id).subscribe((data) => {
          this.ngOnInit();
          Swal.fire({
            title: 'Eliminado',
            text: 'Se ha eliminado correctamente',
            icon: 'success',
          });
        });
      }
    });
  }

  create() {
    this.router.navigate(['ruta/create']);
  }

  view(id: number) {
    this.router.navigate(['ruta/view', id]);
  }

  update(id: number) {
    this.router.navigate(['ruta/update', id]);
  }

  showBatches(id: number){
    this.router.navigate(["lote/filterByRoute", id])
  }

  showAddreRouteOrders(id: number){
    this.router.navigate(["orden-ruta-direccion/filterByRoute", id])
  }

  filterByVehiculo(){
    this.routeService.listByVehiculo(this.vehiculo_id).subscribe(data=>{
      this.routes=data;
      console.log(this.routes)
    })
  }

  filterByContract(){
    this.routeService.listByContract(this.contract_id).subscribe(data=>{
      this.routes=data;
      console.log(this.routes)
    })
  }
}
