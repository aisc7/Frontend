import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from './../../../services/batch.service';
import { Batch } from 'src/app/models/batch.model';
import Swal from 'sweetalert2';

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
    private theFormBuilder: FormBuilder,
    private batchService: BatchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");
    this.mode = 2; // Establecer 'crear' como valor predeterminado
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    } else if (currentUrl.includes("delete")) {
      this.mode = 4;
    }
    console.log('Modo configurado:', this.mode);
    if (this.route.snapshot.params.id) {
      this.batchId = this.route.snapshot.params.id;
      this.getBatch(this.batchId);
    }
  }
  
  configFormGroup() {
    this.batchForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
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

  create() {
    this.trySend = true;
    if (this.batchForm.valid) {
      this.batchService.create(this.batchForm.value).subscribe(() => {
        Swal.fire('Creado', 'El lote ha sido creado correctamente', 'success');
        this.router.navigate(['/batches']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.batchForm.valid) {
      this.batchService.update(this.batchId, this.batchForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El lote ha sido actualizado correctamente', 'success');
        this.router.navigate(['/batches']);
      });
    }
  }
  delete(id: number) {
    Swal.fire({
      title: "Eliminación",
      text: "Está seguro que quiere eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No,cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.batchService.delete(id).subscribe(data => {
          Swal.fire({
            title: "Eliminado",
            text: "Se ha eliminado correctamente",
            icon: "success"
          });
        })

      }
    });
  }
}