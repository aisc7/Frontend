import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Spent } from 'src/app/models/spent.model';
import { SpentService } from 'src/app/services/spent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  spents: Spent[];

  constructor(private spentService: SpentService, private router: Router) {
    console.log('Constructor');
    this.spents = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.spentService.list().subscribe((data) => {
      this.spents = data;
      console.log(this.spents);
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
        this.spentService.delete(id).subscribe((data) => {
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
    this.router.navigate(['gasto/create']);
  }

  view(id: number) {
    this.router.navigate(['gasto/view', id]);
  }

  update(id: number) {
    this.router.navigate(['gasto/update', id]);
  }
}