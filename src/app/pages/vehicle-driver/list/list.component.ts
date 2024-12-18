import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleDriver } from 'src/app/models/vehicle-driver.model';
import { VehicleDriverService } from 'src/app/services/vehicle-driver.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  vehicleDrivers: VehicleDriver[];
  vehiculo_id:number;
  conductor_id: number;

  constructor(private vehicleDriverService: VehicleDriverService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('Constructor');
    this.vehicleDrivers = [];
  }

  ngOnInit(): void {
    this.vehiculo_id = this.activatedRoute.snapshot.params['id'];
    this.conductor_id = this.activatedRoute.snapshot.params['id'];

    const currentUrl = this.activatedRoute.snapshot.url.join('/');

    if(currentUrl.includes('filterByCustomer')){
      this.filterByVehiculo();
    }
    else if(currentUrl.includes('filterByConductor')){
      this.filterByConductor();
    }
    else{
      this.list() //lista por defecto 
    }
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
    this.router.navigate(['chofer/create']);
  }

  view(id: number) {
    this.router.navigate(['chofer/view', id]);
  }

  update(id: number) {
    this.router.navigate(['chofer/update', id]);
  }

  filterByVehiculo(){
    this.vehicleDriverService.listByVehiculo(this.vehiculo_id).subscribe(data=>{
      this.vehicleDrivers=data;
      console.log(this.vehicleDrivers)
    })
  }

  filterByConductor(){
    this.vehicleDriverService.listByConductor(this.conductor_id).subscribe(data=>{
      this.vehicleDrivers=data;
      console.log(this.vehicleDrivers)
    })
  }
}