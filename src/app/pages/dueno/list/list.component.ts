import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Dueno } from 'src/app/models/dueno.model';
import { DuenoService } from 'src/app/services/dueno.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  duenos: Dueno[];

  constructor(private duenoService: DuenoService, private router: Router) {
    console.log('Constructor');
    this.duenos = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.duenoService.list().subscribe((data) => {
      this.duenos = data;
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
        this.duenoService.delete(id).subscribe((data) => {
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
    this.router.navigate(['duenos/create']);
  }

  view(id: number) {
    this.router.navigate(['duenos/view', id]);
  }

  update(id: number) {
    this.router.navigate(['duenos/update', id]);
  }
}