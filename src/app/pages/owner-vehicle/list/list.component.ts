import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwnerVehicle } from 'src/app/models/owner-vehicle.model';
import { OwnerVehicleService } from 'src/app/services/owner-vehicle.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ownerVehicles: OwnerVehicle[];

  constructor(private ownerVehicleService: OwnerVehicleService, private router: Router) {
    console.log('Constructor');
    this.ownerVehicles = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.ownerVehicleService.list().subscribe((data) => {
      this.ownerVehicles = data;
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
        this.ownerVehicleService.delete(id).subscribe((data) => {
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
    this.router.navigate(['owner-vehicles/create']);
  }

  view(id: number) {
    this.router.navigate(['owner-vehicles/view', id]);
  }

  update(id: number) {
    this.router.navigate(['owner-vehicles/update', id]);
  }
}