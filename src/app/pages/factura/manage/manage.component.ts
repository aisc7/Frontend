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
export class ManageComponent implements OnInit {
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
    this.facturaId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.facturaId) {
      this.facturaService.get(this.facturaId).subscribe((data: Factura) => {
        this.facturaForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.facturaForm = this.theFormBuilder.group({
      number: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  get getTheFormGroup() {
    return this.facturaForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.facturaForm.valid) {
      this.facturaService.create(this.facturaForm.value).subscribe(() => {
        Swal.fire('Creado', 'La Factura ha sido creada correctamente', 'success');
        this.router.navigate(['/facturas']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.facturaForm.valid) {
      this.facturaService.update(this.facturaId, this.facturaForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La Factura ha sido actualizada correctamente', 'success');
        this.router.navigate(['/facturas']);
      });
    }
  }
}