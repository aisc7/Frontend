import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleDriver } from 'src/app/models/vehicle-driver.model';
import { VehicleDriverService } from 'src/app/services/vehicle-driver.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  vehicleDrivers: VehicleDriver[];

  constructor(private vehicleDriverService: VehicleDriverService, private router: Router) {
    console.log('Constructor');
    this.vehicleDrivers = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.vehicleDriverService.list().subscribe((data) => {
      this.vehicleDrivers = data;
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
        this.vehicleDriverService.delete(id).subscribe((data) => {
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
    this.router.navigate(['vehicle-drivers/create']);
  }

  view(id: number) {
    this.router.navigate(['vehicle-drivers/view', id]);
  }

  update(id: number) {
    this.router.navigate(['vehicle-drivers/update', id]);
  }
}