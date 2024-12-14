import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from './../../../services/batch.service';
import Swal from 'sweetalert2';
import { Batch } from 'src/app/models/batch.model';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageBatchComponent implements OnInit {
  batchForm: FormGroup;
  batchId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private batchService: BatchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1; // Ver
    } else if (currentUrl.includes('create')) {
      this.mode = 2; // Crear
    } else if (currentUrl.includes('update')) {
      this.mode = 3; // Actualizar
    } else if (currentUrl.includes('delete')) {
      this.mode = 4; // Eliminar
    }

    if (this.route.snapshot.params.id) {
      this.batchId = this.route.snapshot.params.id;
      this.getBatch(this.batchId);
    }
  }

  configFormGroup() {
    this.batchForm = this.formBuilder.group({
      quantity: ['', [Validators.required, Validators.min(1)]], // Cantidad mayor a 0
      route_id: ['', Validators.required] // ID de la Ruta
    });
  }

  get getTheFormGroup() {
    return this.batchForm.controls;
  }

  getBatch(id: number) {
    this.batchService.get(id).subscribe((data) => {
      this.batchForm.patchValue(data);
    });
  }

  handleAction() {
    if (this.mode === 2) {
      this.create();
    } else if (this.mode === 3) {
      this.update();
    }
  }

  create() {
    this.trySend = true;
    if (this.batchForm.valid) {
      this.batchService.create(this.batchForm.value).subscribe(() => {
        Swal.fire('Creado', 'El lote ha sido creado correctamente', 'success');
        this.router.navigate(['/batches']);
      });
    } else {
      Swal.fire('Error', 'Complete todos los campos obligatorios', 'error');
    }
  }

  update() {
    this.trySend = true;
    if (this.batchForm.valid) {
      this.batchService.update(this.batchId, this.batchForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El lote ha sido actualizado correctamente', 'success');
        this.router.navigate(['/batches']);
      });
    } else {
      Swal.fire('Error', 'Complete todos los campos obligatorios', 'error');
    }
  }

  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este lote será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.batchService.delete(this.batchId).subscribe(() => {
          Swal.fire('Eliminado', 'El lote ha sido eliminado', 'success');
          this.router.navigate(['/batches']);
        });
      }
    });
  }
}