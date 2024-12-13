import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Administrator } from 'src/app/models/administrator.model';
import { AdministratorService } from 'src/app/services/administrator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  administrators: Administrator[] = [];

  constructor(
    private administratorService: AdministratorService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.administratorService.list().subscribe(
      (data) => {
        console.log('Datos recibidos:', data);
        this.administrators = data;
      }
    );
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
        this.administratorService.delete(id).subscribe(
          () => {
            this.list(); // Actualizar la lista después de eliminar
            Swal.fire('Eliminado', 'Se ha eliminado correctamente', 'success');
          },
          (error) => {
            console.error('Error al eliminar administrador:', error);
          }
        );
      }
    });
  }


  create() {
    this.router.navigate(['administrator/create']);
  }

  view(id: number) {
    this.router.navigate(['administrator/view', id]);
  }

  update(id: number) {
    this.router.navigate(['administrator/update', id]);
  }
}
