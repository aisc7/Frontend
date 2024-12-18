import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Seguro } from 'src/app/models/seguro.model';
import { SeguroService } from 'src/app/services/seguro.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  seguros: Seguro[];
  vehiculo_id: number;

  constructor(private seguroService: SeguroService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('Constructor');
    this.seguros = [];
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
    this.seguroService.list().subscribe((data) => {
      this.seguros = data;
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
        this.seguroService.delete(id).subscribe((data) => {
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
    this.router.navigate(['seguro/create']);
  }

  view(id: number) {
    this.router.navigate(['seguro/view', id]);
  }

  update(id: number) {
    this.router.navigate(['seguro/update', id]);
  }


  filterByVehiculo(){
    this.seguroService.listByVehiculo(this.vehiculo_id).subscribe(data=>{
      this.seguros = data;
      console.log(this.seguros);
      
    })
  }
}