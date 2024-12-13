import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/models/hotel.model';
import { HotelService } from 'src/app/services/hotel.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  hoteles: Hotel[];

  constructor(private hotelService: HotelService, private router: Router) {
    console.log('Constructor');
    this.hoteles = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.hotelService.list().subscribe((data: any[]) => {
      this.hoteles = data.map(item => ({
        id: item.id,
        stars: item.starts,
        servicio_id: item.servicio_id,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        service: item.service
      }));
      console.log('empresa:', this.hoteles);
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
        this.hotelService.delete(id).subscribe((data) => {
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
    this.router.navigate(['hotel/create']);
  }

  view(id: number) {
    this.router.navigate(['hotel/view', id]);
  }

  update(id: number) {
    this.router.navigate(['hotel/update', id]);
  }
}