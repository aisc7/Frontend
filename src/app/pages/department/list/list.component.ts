import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  departments: Department[];

  constructor(private departmentService: DepartmentService, private router: Router) {
    console.log('Constructor');
    this.departments = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.departmentService.list().subscribe((data) => {
      this.departments = data;
      console.log('empresa:', this.departments);
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
        this.departmentService.delete(id).subscribe((data) => {
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
    this.router.navigate(['departmento/create']);
  }

  view(id: number) {
    this.router.navigate(['departmento/view', id]);
  }

  update(id: number) {
    this.router.navigate(['departmento/update', id]);
  }

  showMunicipalities(id: number){
    this.router.navigate(["municipio/filterByDepartment", id]);
  }
}