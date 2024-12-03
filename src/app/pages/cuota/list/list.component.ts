import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cuota } from 'src/app/models/cuota.model';
import { CuotaService } from 'src/app/services/cuota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cuotas: Cuota[];

  constructor(private cuotaService: CuotaService, private router: Router) {
    console.log('Constructor');
    this.cuotas = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.cuotaService.list().subscribe((data) => {
      this.cuotas = data;
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
        this.cuotaService.delete(id).subscribe((data) => {
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
    this.router.navigate(['cuotas/create']);
  }

  view(id: number) {
    this.router.navigate(['cuotas/view', id]);
  }

  update(id: number) {
    this.router.navigate(['cuotas/update', id]);
  }
}