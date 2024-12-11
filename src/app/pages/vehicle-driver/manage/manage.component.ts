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
export class ManageVehiculoDriverComponent implements OnInit {
  vehiculoDriverForm: FormGroup;
  vehiculoDriverId: number;
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
    this.vehiculoDriverId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.vehiculoDriverId) {
      this.vehicleDriverService.get(this.vehiculoDriverId).subscribe((data: VehicleDriver) => {
        this.vehiculoDriverForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.vehiculoDriverForm = this.theFormBuilder.group({
      driverId: ['', Validators.required],
      vehicleId: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.vehiculoDriverForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.vehiculoDriverForm.valid) {
      this.vehicleDriverService.create(this.vehiculoDriverForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Conductor del Vehículo ha sido creado correctamente', 'success');
        this.router.navigate(['/vehiculo-drivers']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.vehiculoDriverForm.valid) {
      this.vehicleDriverService.update(this.vehiculoDriverId, this.vehiculoDriverForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Conductor del Vehículo ha sido actualizado correctamente', 'success');
        this.router.navigate(['/vehiculo-drivers']);
      });
    }
  }
}
