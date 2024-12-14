import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Batch } from 'src/app/models/batch.model';
import { BatchService } from 'src/app/services/batch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  batches: Batch[] = []; // Inicializar como arreglo vacío

  constructor(private batchService: BatchService, private router: Router) {
    console.log('Constructor ejecutado');
  }

  ngOnInit(): void {
    console.log('ngOnInit ejecutado');
    this.loadBatches(); // Método para cargar la lista
  }

  // Método para listar lotes desde el servicio
  loadBatches() {
    this.batchService.list().subscribe(
      (data: Batch[]) => {
        this.batches = data;
      },
      (error) => {
        console.error('Error al cargar los lotes:', error);
        Swal.fire('Error', 'No se pudieron cargar los lotes.', 'error');
      }
    );
  }

  // Método para eliminar un lote con confirmación
  delete(id: number) {
    Swal.fire({
      title: 'Eliminación',
      text: '¿Está seguro que quiere eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.batchService.delete(id).subscribe(
          () => {
            this.loadBatches(); // Recargar la lista tras eliminar
            Swal.fire('Eliminado', 'El lote se ha eliminado correctamente', 'success');
          },
          (error) => {
            console.error('Error al eliminar el lote:', error);
            Swal.fire('Error', 'No se pudo eliminar el lote.', 'error');
          }
        );
      }
    });
  }

  // Método para redirigir al formulario de creación
  create() {
    this.router.navigate(['lote/create']);
  }

  // Método para redirigir a la vista detallada
  view(id: number) {
    this.router.navigate(['lote/view', id]);
  }

  // Método para redirigir al formulario de edición
  update(id: number) {
    this.router.navigate(['lote/update', id]);
  }
}