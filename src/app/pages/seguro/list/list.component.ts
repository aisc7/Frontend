import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private seguroService: SeguroService, private router: Router) {
    console.log('Constructor');
    this.seguros = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
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
    this.router.navigate(['seguros/create']);
  }

  view(id: number) {
    this.router.navigate(['seguros/view', id]);
  }

  update(id: number) {
    this.router.navigate(['seguros/update', id]);
  }
}