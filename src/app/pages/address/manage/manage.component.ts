import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from './../../../services/address.service';
import Swal from 'sweetalert2';
import { Address } from 'src/app/models/address.model';
import { Municipality } from 'src/app/models/municipality.model';
import { MunicipalityService } from 'src/app/services/municipality.service';

@Component({
  selector: 'app-manage-address',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageAddressComponent implements OnInit {
  addressForm: FormGroup;
  addressId: number;
  mode: number;
  trySend: boolean = false;
  address:Address;
  municipalities:Municipality[];


  constructor(
    private theFormBuilder: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute,
    private municipalitiesService:MunicipalityService

  ) {
    this.municipalities=[];
    this.configFormGroup();
    this.address={id:0, street:"", number:"", neighborhood:"",  reference:"", municipality:{
      id:null
    } }
  
}  

  municipalitiesList(){
    this.municipalitiesService.list().subscribe(data=>{
      this.municipalities=data;
    })
  }
  

  ngOnInit(): void {
    this.municipalitiesList();
    this.configFormGroup();
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

    if (this.route.snapshot.params.id) {
      this.addressId = this.route.snapshot.params.id;
      this.getAddress(this.addressId);
    }
  }

  configFormGroup() {
    this.addressForm = this.theFormBuilder.group({
      street: ['', Validators.required],
      number: [''],
      neighborhood: ['', Validators.required],
      reference: [''],
      municipality_id: [null, Validators.required],
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

  handleAction() {
    this.trySend = true;
    if (this.addressForm.valid) {
      if (this.mode === 2) {
        this.create();
      } else if (this.mode === 3) {
        this.update();
      }
    }
  }

  create() {
    this.addressService.create(this.addressForm.value).subscribe(
      () => {
        Swal.fire('Creado', 'La dirección ha sido creada correctamente', 'success');
        this.router.navigate(['/addresses']);
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al crear la dirección', 'error');
        console.error(error);
      }
    );
  }

  update() {
    this.addressService.update(this.addressId, this.addressForm.value).subscribe(
      () => {
        Swal.fire('Actualizado', 'La dirección ha sido actualizada correctamente', 'success');
        this.router.navigate(['/addresses']);
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al actualizar la dirección', 'error');
        console.error(error);
      }
    );
  }
}