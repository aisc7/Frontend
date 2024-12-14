import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from './../../../services/costumer.service';
import { Customer } from 'src/app/models/costumer.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageCustomerComponent implements OnInit {
  customerForm: FormGroup;
  customerId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private customerService: CustomerService,
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
    }

    this.customerId = this.route.snapshot.params['id'];
    if (this.customerId) {
      this.customerService.get(this.customerId).subscribe((data: Customer) => {
        this.customerForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.customerForm = this.theFormBuilder.group({
      user_id: ['', Validators.required], // Campo requerido
      phone: ['', Validators.required], // Campo requerido
      order_count: [0, [Validators.required, Validators.min(0)]], // Número de pedidos inicial (0 por defecto)
    });
  }

  get getTheFormGroup() {
    return this.customerForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.customerForm.valid) {
      this.customerService.create(this.customerForm.value).subscribe(() => {
        Swal.fire('Creado', 'El cliente ha sido creado correctamente', 'success');
        this.router.navigate(['/customers']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.customerForm.valid) {
      this.customerService.update(this.customerId, this.customerForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El cliente ha sido actualizado correctamente', 'success');
        this.router.navigate(['/customers']);
      });
    }
  }
}