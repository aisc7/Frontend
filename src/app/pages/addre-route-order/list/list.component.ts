import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private addreRouteOrderService: AddreRouteOrderService, private router: Router) {
    console.log('Constructor');
    this.addreRouteOrders = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
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
}