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
  
    if (this.route.snapshot.params.id) {
      this.facturaId = this.route.snapshot.params.id;
      this.getFactura(this.facturaId);
    }
  }

  configFormGroup() {
    this.facturaForm = this.theFormBuilder.group({
      amount: ['', Validators.required],
      date: ['', Validators.required],
      customerId: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.facturaForm.controls;
  }

  getFactura(id: number) {
    this.facturaService.get(id).subscribe((data) => {
      this.facturaForm.patchValue(data);
    });
  }

  create() {
    this.trySend = true;
    if (this.facturaForm.valid) {
      this.facturaService.create(this.facturaForm.value).subscribe(() => {
        Swal.fire('Creado', 'La factura ha sido creada correctamente', 'success');
        this.router.navigate(['/facturas']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.facturaForm.valid) {
      this.facturaService.update(this.facturaId, this.facturaForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La factura ha sido actualizada correctamente', 'success');
        this.router.navigate(['/facturas']);
      });
    }
  }
  delete () {
    this.facturaService.delete(this.facturaId).subscribe(() => {
      Swal.fire('Eliminado', 'La factura ha sido eliminada correctamente', 'success');
      this.router.navigate(['/facturas']);
    });
  }
}