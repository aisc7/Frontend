import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private municipalityService: MunicipalityService, private router: Router) {
    console.log('Constructor');
    this.municipalities = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.municipalityService.list().subscribe((data) => {
      this.municipalities = data;
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
    this.router.navigate(['municipalities/create']);
  }

  view(id: number) {
    this.router.navigate(['municipalities/view', id]);
  }

  update(id: number) {
    this.router.navigate(['municipalities/update', id]);
  }
}