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

export class ManageAddressComponent implements OnInit {
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
      this.addressId = this.route.snapshot.params.id;
      this.getAddress(this.addressId);
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

  getAddress(id: number) {
    this.addressService.get(id).subscribe((data) => {
      this.addressForm.patchValue(data);
    });
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