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
export class ManageComponent implements OnInit {
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
    this.customerId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.customerId) {
      this.customerService.get(this.customerId).subscribe((data: Customer) => {
        this.customerForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.customerForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get getTheFormGroup() {
    return this.customerForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.customerForm.valid) {
      this.customerService.create(this.customerForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Cliente ha sido creado correctamente', 'success');
        this.router.navigate(['/customers']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.customerForm.valid) {
      this.customerService.update(this.customerId, this.customerForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Cliente ha sido actualizado correctamente', 'success');
        this.router.navigate(['/customers']);
      });
    }
  }
}