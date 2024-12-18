import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { Municipality } from 'src/app/models/municipality.model';
import { MunicipalityService } from 'src/app/services/municipality.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  municipalities: Municipality[];
  department_id: number;


  constructor(private municipalityService: MunicipalityService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('Constructor');
    this.municipalities = [];
  }

  ngOnInit(): void {
    this.department_id = null
    const currentUrl = this.activatedRoute.snapshot.url.join('/');

    if(currentUrl.includes('filterByDepartment')){
      this.department_id = +this.activatedRoute.snapshot.params['id'];
      this.filterByDepartment();
    }else{
      this.list() //lista por defecto 
    }
  }

  list() {
    this.municipalityService.list().subscribe((data) => {
      this.municipalities = data;
      console.log(this.municipalities);
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminación',
      text: '¿Está seguro que quiere eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.municipalityService.delete(id).subscribe((data) => {
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
    this.router.navigate(['municipio/create']);
  }

  view(id: number) {
    this.router.navigate(['municipio/view', id]);
  }

  update(id: number) {
    this.router.navigate(['municipio/update', id]);
  }

  //filtrar por departamento
  filterByDepartment(){
    this.municipalityService.listByDepartment(this.department_id).subscribe(data=>{
      this.municipalities = data;
      console.log(this.municipalities);
      
    })
  }

  //funcion para crear una operacion segun un municipio

  createForDepartment() {
    this.router.navigate(["municipio/createForDepartment", this.department_id]);
    console.log("aqui estoy en createForDepartment", this.department_id);
  }


  showAddresses(id: number){
    this.router.navigate(["direccion/filterByMunicipality", id])
  }

  showDistributionCenter(id: number){
    this.router.navigate(["centro-distribucion/filterByMunicipality", id])
  }

  showOperations(id:number){
    this.router.navigate(["operacion/filterByMunicipality", id])
  }
}