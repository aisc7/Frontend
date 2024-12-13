import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Batch } from 'src/app/models/batch.model';
import { BatchService } from 'src/app/services/batch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  batches: Batch[];

  constructor(private batchService: BatchService, private router: Router) {
    console.log('Constructor');
    this.batches = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.batchService.list().subscribe((data) => {
      this.batches = data;
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
        this.batchService.delete(id).subscribe((data) => {
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
    this.router.navigate(['lote/create']);
  }

  view(id: number) {
    this.router.navigate(['lote/view', id]);
  }

  update(id: number) {
    this.router.navigate(['lote/update', id]);
  }
}