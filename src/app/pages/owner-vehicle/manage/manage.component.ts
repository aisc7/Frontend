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

export class ManageOwnerVehicleComponent implements OnInit {
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
    const currentUrl = this.route.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
  
    if (this.route.snapshot.params.id) {
      this.ownerVehicleId = this.route.snapshot.params.id;
      this.getOwnerVehicle(this.ownerVehicleId);
    }
  }

  configFormGroup() {
    this.ownerVehicleForm = this.theFormBuilder.group({
      ownerId: ['', Validators.required],
      vehicleId: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.ownerVehicleForm.controls;
  }

  getOwnerVehicle(id: number) {
    this.ownerVehicleService.get(id).subscribe((data) => {
      this.ownerVehicleForm.patchValue(data);
    });
  }

  create() {
    this.trySend = true;
    if (this.ownerVehicleForm.valid) {
      this.ownerVehicleService.create(this.ownerVehicleForm.value).subscribe(() => {
        Swal.fire('Creado', 'El vehículo del propietario ha sido creado correctamente', 'success');
        this.router.navigate(['/owner-vehicles']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.ownerVehicleForm.valid) {
      this.ownerVehicleService.update(this.ownerVehicleId, this.ownerVehicleForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El vehículo del propietario ha sido actualizado correctamente', 'success');
        this.router.navigate(['/owner-vehicles']);
      });
    }
  }
}