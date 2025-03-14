import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  vehiculo_id:number;

  constructor(private ownerVehicleService: OwnerVehicleService, private router: Router, private activatedRoute:ActivatedRoute) {
    console.log('Constructor');
    this.ownerVehicles = [];
  }

  ngOnInit(): void {
    this.vehiculo_id = this.activatedRoute.snapshot.params['id'];
    const currentUrl = this.activatedRoute.snapshot.url.join('/');

    if(currentUrl.includes('filterByVehiculo')){
      this.filterByVehiculo();
    }else{
      this.list() //lista por defecto 
    }
  }

  list() {
    this.ownerVehicleService.list().subscribe((data) => {
      this.ownerVehicles = data;
      console.log(this.ownerVehicles);
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
    this.router.navigate(['vehiculo-dueno/create']);
  }

  view(id: number) {
    this.router.navigate(['vehiculo-dueno/view', id]);
  }

  update(id: number) {
    this.router.navigate(['vehiculo-dueno/update', id]);
  }

  filterByVehiculo(){
    this.ownerVehicleService.listByVehiculo(this.vehiculo_id).subscribe(data=>{
      this.ownerVehicles=data;
      console.log(this.ownerVehicles)
    })
  }
}