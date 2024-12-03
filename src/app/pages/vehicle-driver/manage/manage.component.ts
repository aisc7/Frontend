import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleDriverService } from './../../../services/vehicle-driver.service';
import { VehicleDriver } from 'src/app/models/vehicle-driver.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  vehicleDriverForm: FormGroup;
  vehicleDriverId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private vehicleDriverService: VehicleDriverService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.vehicleDriverId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.vehicleDriverId) {
      this.vehicleDriverService.get(this.vehicleDriverId).subscribe((data: VehicleDriver) => {
        this.vehicleDriverForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.vehicleDriverForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      license: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.vehicleDriverForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.vehicleDriverForm.valid) {
      this.vehicleDriverService.create(this.vehicleDriverForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Conductor de Vehículo ha sido creado correctamente', 'success');
        this.router.navigate(['/vehicle-drivers']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.vehicleDriverForm.valid) {
      this.vehicleDriverService.update(this.vehicleDriverId, this.vehicleDriverForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Conductor de Vehículo ha sido actualizado correctamente', 'success');
        this.router.navigate(['/vehicle-drivers']);
      });
    }
  }
}