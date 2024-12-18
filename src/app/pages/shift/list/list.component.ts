import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  conductor_id: number;

  constructor(private shiftService: ShiftService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('Constructor');
    this.shifts = [];
  }

  ngOnInit(): void {
    this.conductor_id = this.activatedRoute.snapshot.params['id'];
    const currentUrl = this.activatedRoute.snapshot.url.join('/');

    if(currentUrl.includes('filterByConductor')){
      this.filterByConductor();
    }else{
      this.list() //lista por defecto 
    }
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
    this.router.navigate(['turno/create']);
  }

  view(id: number) {
    this.router.navigate(['turno/view', id]);
  }

  update(id: number) {
    this.router.navigate(['turno/update', id]);
  }

  filterByConductor(){
    this.shiftService.listByConductor(this.conductor_id).subscribe(data =>{
      this.shifts = data;
      console.log(this.shifts)
    })
  }
}