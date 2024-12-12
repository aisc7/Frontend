import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from './../../../services/batch.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageBatchComponent implements OnInit {
  batchForm: FormGroup;
  batchId: number | null = null;
  mode: number = 2;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private batchService: BatchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");
    this.mode = this.getModeFromUrl(currentUrl);

    if (this.route.snapshot.params.id) {
      this.batchId = +this.route.snapshot.params.id;
      this.getBatch(this.batchId);
    }
  }

  configFormGroup() {
    this.batchForm = this.theFormBuilder.group({
      quantity: ['', Validators.required],
      routeId: ['', Validators.required],
      addrerouteId: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.batchForm.controls;
  }

  getModeFromUrl(url: string): number {
    if (url.includes("view")) return 1;
    if (url.includes("create")) return 2;
    if (url.includes("update")) return 3;
    if (url.includes("delete")) return 4;
    return 2; // Default: Crear
  }

  getBatch(id: number) {
    this.batchService.get(id).subscribe((data) => {
      this.batchForm.patchValue(data);
    });
  }

  handleAction() {
    this.trySend = true;

    if (!this.batchForm.valid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    switch (this.mode) {
      case 2:
        this.batchService.create(this.batchForm.value).subscribe(() => {
          Swal.fire('Creado', 'El lote ha sido creado correctamente.', 'success');
          this.router.navigate(['/batches']);
        });
        break;

      case 3:
        if (this.batchId !== null) {
          this.batchService.update(this.batchId, this.batchForm.value).subscribe(() => {
            Swal.fire('Actualizado', 'El lote ha sido actualizado correctamente.', 'success');
            this.router.navigate(['/batches']);
          });
        }
        break;

      case 1:
        if (this.batchId !== null) {
          Swal.fire({
            title: "Eliminar",
            text: "¿Está seguro que desea eliminar este lote?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              this.batchService.delete(this.batchId).subscribe(() => {
                Swal.fire('Eliminado', 'El lote ha sido eliminado correctamente.', 'success');
                this.router.navigate(['/batches']);
              });
            }
          });
        }
        break;

      default:
        Swal.fire('Error', 'Modo no reconocido.', 'error');
    }
  }
}
