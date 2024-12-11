import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Conductor } from 'src/app/models/conductor.model';
import { ConductorService } from 'src/app/services/conductor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  conductors: Conductor[];

  constructor(private conductorService: ConductorService, private router: Router) {
    console.log('Constructor');false
    this.conductors = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.conductorService.list().subscribe((data) => {
      this.conductors = data;
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
        this.conductorService.delete(id).subscribe((data) => {
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
    this.router.navigate(['conductors/create']);
  }

  view(id: number) {
    this.router.navigate(['conductors/view', id]);
  }

  update(id: number) {
    this.router.navigate(['conductors/update', id]);
  }
}