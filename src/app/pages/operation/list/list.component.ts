import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Operation } from 'src/app/models/operation.model';
import { OperationService } from 'src/app/services/operation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  operations: Operation[];
  municipality_id: number;
  vehiculo_id: number;

  constructor(private operationService: OperationService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('Constructor');
    this.operations = [];
  }

  ngOnInit(): void {
    const currentUrl = this.activatedRoute.snapshot.url.join('/');
    this.municipality_id=null;
    this.vehiculo_id=null;

    if(currentUrl.includes('filterByMunicipality')){
      this.municipality_id= +this.activatedRoute.snapshot.params['id'];
      this.filterByMunicipality();

    }else if(currentUrl.includes('filterByVehiculo')){
      this.vehiculo_id= +this.activatedRoute.snapshot.params['id'];
      this.filterByVehiculo();
    }
    else{
      this.list() //lista por defecto 
    }
  }

  list() {
    this.operationService.list().subscribe((data) => {
      this.operations = data;
      
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
        this.operationService.delete(id).subscribe((data) => {
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
    this.router.navigate(['operacion/create']);
  }

  view(id: number) {
    this.router.navigate(['operacion/view', id]);
  }

  update(id: number) {
    this.router.navigate(['operacion/update', id]);
  }


  filterByMunicipality(){
    this.operationService.listByMunicipality(this.municipality_id).subscribe(data=>{
      this.operations = data;
      console.log(this.operations)
    })
  }

  createForMunicipality(){
    this.router.navigate(['operacion/createForMunicipality', this.municipality_id])
  }

  filterByVehiculo(){
    this.operationService.listByVehiculo(this.vehiculo_id).subscribe(data=>{
      this.operations = data;
      console.log(this.operations);
    })
  }

  createForVehiculo(){
    this.router.navigate(['operacion/createForVehiculo', this.vehiculo_id])
  }
}