import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NaturalPerson } from 'src/app/models/natural-person.model';
import { NaturalPersonService } from 'src/app/services/natural-person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  naturalPerson: NaturalPerson[];

  constructor(private naturalPersonService: NaturalPersonService, private router: Router) {
    console.log('Constructor');
    this.naturalPerson = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.naturalPersonService.list().subscribe((data) => {
      this.naturalPerson= data;
      console.log(this.naturalPerson);
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
        this.naturalPersonService.delete(id).subscribe((data) => {
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
    this.router.navigate(['persona-natural/create']);
  }

  view(id: number) {
    this.router.navigate(['persona-natural/view', id]);
  }

  update(id: number) {
    this.router.navigate(['persona-natural/update', id]);
  }
}