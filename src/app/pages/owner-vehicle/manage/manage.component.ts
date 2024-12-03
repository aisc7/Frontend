import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnerVehicleService } from './../../../services/owner-vehicle.service';
import { OwnerVehicle } from 'src/app/models/owner-vehicle.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  ownerVehicleForm: FormGroup;
  ownerVehicleId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private ownerVehicleService: OwnerVehicleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.ownerVehicleId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.ownerVehicleId) {
      this.ownerVehicleService.get(this.ownerVehicleId).subscribe((data: OwnerVehicle) => {
        this.ownerVehicleForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.ownerVehicleForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      document: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.ownerVehicleForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.ownerVehicleForm.valid) {
      this.ownerVehicleService.create(this.ownerVehicleForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Propietario de Vehículo ha sido creado correctamente', 'success');
        this.router.navigate(['/owner-vehicles']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.ownerVehicleForm.valid) {
      this.ownerVehicleService.update(this.ownerVehicleId, this.ownerVehicleForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Propietario de Vehículo ha sido actualizado correctamente', 'success');
        this.router.navigate(['/owner-vehicles']);
      });
    }
  }
}