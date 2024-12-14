import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturaService } from './../../../services/factura.service';
import { Factura } from 'src/app/models/factura.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-factura',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageFacturaComponent implements OnInit {
  facturaForm: FormGroup;
  facturaId: number | undefined;
  mode: number = 0; // 1: View, 2: Create, 3: Update, 4: Delete
  trySend: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private facturaService: FacturaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    } else if (currentUrl.includes('delete')) {
      this.mode = 4;
    }

    this.facturaId = this.route.snapshot.params['id'];
    if (this.facturaId && this.mode !== 2) {
      this.getFactura(this.facturaId);
    }
  }

  configFormGroup() {
    this.facturaForm = this.formBuilder.group({
      fecha_emision: ['', Validators.required],
      monto_total: ['', Validators.required],
      estado: ['', Validators.required],
      cuota_id: ['', Validators.required],
      spent_id: ['', Validators.required],
    });
  }

  get formControls() {
    return this.facturaForm.controls;
  }

  getFactura(id: number) {
    this.facturaService.get(id).subscribe((data: Factura) => {
      this.facturaForm.patchValue(data);
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
    if (this.facturaForm.valid) {
      this.facturaService.create(this.facturaForm.value).subscribe(
        () => {
          Swal.fire('Creado', 'La factura ha sido creada correctamente.', 'success');
          this.router.navigate(['/facturas']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al crear la factura.', 'error');
        }
      );
    }
  }

  update() {
    this.trySend = true;
    if (this.facturaForm.valid) {
      this.facturaService.update(this.facturaId!, this.facturaForm.value).subscribe(
        () => {
          Swal.fire('Actualizado', 'La factura ha sido actualizada correctamente.', 'success');
          this.router.navigate(['/facturas']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al actualizar la factura.', 'error');
        }
      );
    }
  }
}