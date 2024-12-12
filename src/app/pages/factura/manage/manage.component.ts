import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturaService } from './../../../services/factura.service';
import { Factura } from 'src/app/models/factura.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageFacturaComponent implements OnInit {
  facturaForm: FormGroup;
  facturaId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private facturaService: FacturaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    // Determina el modo (crear, ver, actualizar)
    const currentUrl = this.route.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    } else if (currentUrl.includes("delete")) {
      this.mode = 4;
    }

    // Si existe un ID en la URL, obtenemos los datos de la factura
    if (this.route.snapshot.params.id) {
      this.facturaId = this.route.snapshot.params.id;
      this.getFactura(this.facturaId);
    }
  }

  // Configuración del formulario con validaciones
  configFormGroup() {
    this.facturaForm = this.theFormBuilder.group({
      fecha_emision: ['', Validators.required],
      monto_total: ['', Validators.required],
      estado: ['', Validators.required],
      cuota_id: ['', Validators.required],
      spent_id: ['', Validators.required]
    });
  }

  // Getter para acceder a los controles del formulario
  get getTheFormGroup() {
    return this.facturaForm.controls;
  }

  // Obtener los datos de una factura específica
  getFactura(id: number) {
    this.facturaService.get(id).subscribe((data) => {
      this.facturaForm.patchValue(data); // Llenamos el formulario con los datos
    });
  }

  // Crear una nueva factura
  create() {
    this.trySend = true;
    if (this.facturaForm.valid) {
      this.facturaService.create(this.facturaForm.value).subscribe(() => {
        Swal.fire('Creado', 'La factura ha sido creada correctamente', 'success');
        this.router.navigate(['/facturas']); // Redirige a la lista de facturas
      });
    }
  }

  // Actualizar una factura existente
  update() {
    this.trySend = true;
    if (this.facturaForm.valid) {
      this.facturaService.update(this.facturaId, this.facturaForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La factura ha sido actualizada correctamente', 'success');
        this.router.navigate(['/facturas']); // Redirige a la lista de facturas
      });
    }
  }

  // Eliminar una factura
  delete() {
    this.facturaService.delete(this.facturaId).subscribe(() => {
      Swal.fire('Eliminado', 'La factura ha sido eliminada correctamente', 'success');
      this.router.navigate(['/facturas']); // Redirige a la lista de facturas
    });
  }

  // Maneja las acciones dependiendo del modo (crear/actualizar)
  handleAction() {
    this.trySend = true;
    if (this.facturaForm.valid) {
      if (this.mode === 2) { // Crear
        this.create();
      } else if (this.mode === 3) { // Actualizar
        this.update();
      }
    }
  }
}
