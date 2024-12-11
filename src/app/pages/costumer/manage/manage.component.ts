import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from './../../../services/costumer.service';
import { Customer } from 'src/app/models/costumer.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
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
      this.customerId = this.route.snapshot.params.id;
      this.getCustomer(this.customerId);
    }
  }

  configFormGroup() {
    this.customerForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.customerForm.controls;
  }

  getCustomer(id: number) {
    this.customerService.get(id).subscribe((data) => {
      this.customerForm.patchValue(data);
    });
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
  delete () {
    this.customerService.delete(this.customerId).subscribe(() => {
      Swal.fire('Eliminado', 'El cliente ha sido eliminado correctamente', 'success');
      this.router.navigate(['/customers']);
    });
  }
}