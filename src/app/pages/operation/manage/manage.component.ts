import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OperationService } from './../../../services/operation.service';
import { Operation } from 'src/app/models/operation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  operationForm: FormGroup;
  operationId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private operationService: OperationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1; // Modo de ver
    } else if (currentUrl.includes("create")) {
      this.mode = 2; // Modo de crear
    } else if (currentUrl.includes("update")) {
      this.mode = 3; // Modo de actualizar
    } else if (currentUrl.includes("delete")) {
      this.mode = 4; // Modo de eliminar
    }
  
    // Si hay un id de operación en la URL, obtenemos los datos de la operación
    if (this.operationId) {
      this.operationService.get(this.operationId).subscribe((data: Operation) => {
        this.operationForm.patchValue(data);
      });
    }
  }
  

  configFormGroup() {
    this.operationForm = this.theFormBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      municipality_id: ['', Validators.required],
      vehiculo_id: ['', Validators.required]
    });
  }
  
  get getTheFormGroup() {
    return this.operationForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.operationForm.valid) {
      this.operationService.create(this.operationForm.value).subscribe(() => {
        Swal.fire('Creado', 'La Operación ha sido creada correctamente', 'success');
        this.router.navigate(['/operations']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.operationForm.valid) {
      this.operationService.update(this.operationId, this.operationForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La Operación ha sido actualizada correctamente', 'success');
        this.router.navigate(['/operations']);
      });
    }
  }
  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la operación.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.operationService.delete(this.operationId).subscribe(() => {
          Swal.fire('Eliminado', 'La operación ha sido eliminada correctamente', 'success');
          this.router.navigate(['/operations']);
        });
      }
    });
  }
  
}