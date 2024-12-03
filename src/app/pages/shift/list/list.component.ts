import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shift } from 'src/app/models/shift.model';
import { ShiftService } from 'src/app/services/shift.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  shifts: Shift[];

  constructor(private shiftService: ShiftService, private router: Router) {
    console.log('Constructor');
    this.shifts = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.shiftService.list().subscribe((data) => {
      this.shifts = data;
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
        this.shiftService.delete(id).subscribe((data) => {
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
    this.router.navigate(['shifts/create']);
  }

  view(id: number) {
    this.router.navigate(['shifts/view', id]);
  }

  update(id: number) {
    this.router.navigate(['shifts/update', id]);
  }
}