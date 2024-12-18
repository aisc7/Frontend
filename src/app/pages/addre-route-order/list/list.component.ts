import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AddreRouteOrder } from 'src/app/models/addre-route-order.model';
import { AddreRouteOrderService } from 'src/app/services/addre-route-order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  addreRouteOrders: AddreRouteOrder[];
  route_id: number;
  address_id:number;

  constructor(private addreRouteOrderService: AddreRouteOrderService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('Constructor');
    this.addreRouteOrders = [];
  }

  ngOnInit(): void {
    this.route_id = null;
    this.address_id= null;
    const currentUrl = this.activatedRoute.snapshot.url.join('/');

    if(currentUrl.includes('filterByRoute')){
      this.route_id=+this.activatedRoute.snapshot.params['id'];
      this.filterByRoute();
    }else if(currentUrl.includes('filterByAddress')){
      this.address_id = +this.activatedRoute.snapshot.params['id'];
      this.filterByAddress();
    }
    else{
      this.list() //lista por defecto 
    }
  }

  list() {
    this.addreRouteOrderService.list().subscribe((data) => {
      this.addreRouteOrders = data;
      console.log('Datos recibidos:', data);
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
        this.addreRouteOrderService.delete(id).subscribe((data) => {
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
    this.router.navigate(['orden-ruta-direccion/create']);
  }

  view(id: number) {
    console.log('View');
    this.router.navigate(['orden-ruta-direccion/view', id]);
  }

  update(id: number) {
    this.router.navigate(['orden-ruta-direccion/update', id]);
  }

  filterByRoute(){
    this.addreRouteOrderService.listByRoute(this.route_id).subscribe(data=>{
      this.addreRouteOrders= data;
      console.log(this.addreRouteOrders);
    })
  }


  //funcion para crear una operacion segun un municipio

  createForRoute() {
    this.router.navigate(["orden-ruta-direccion/createForRoute", this.route_id]);
  }

  filterByAddress(){
    this.addreRouteOrderService.listByAddress(this.address_id).subscribe(data=>{
      this.addreRouteOrders= data;
      console.log(this.addreRouteOrders);
    })
  }

  createForAddress() {
    this.router.navigate(["orden-ruta-direccion/createForAddress", this.address_id]);
  }


}