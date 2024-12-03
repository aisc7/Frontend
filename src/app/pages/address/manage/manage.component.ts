import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from './../../../services/address.service';
import { Address } from 'src/app/models/address.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  addressForm: FormGroup;
  addressId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.addressId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.addressId) {
      this.addressService.get(this.addressId).subscribe((data: Address) => {
        this.addressForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.addressForm = this.theFormBuilder.group({
      street: ['', Validators.required],
      number: ['', Validators.required],
      neighborhood: ['', Validators.required],
      reference: ['', Validators.required],
      municipalityId: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.addressForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.addressForm.valid) {
      this.addressService.create(this.addressForm.value).subscribe(() => {
        Swal.fire('Creado', 'La dirección ha sido creada correctamente', 'success');
        this.router.navigate(['/addresses']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.addressForm.valid) {
      this.addressService.update(this.addressId, this.addressForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La dirección ha sido actualizada correctamente', 'success');
        this.router.navigate(['/addresses']);
      });
    }
  }
}