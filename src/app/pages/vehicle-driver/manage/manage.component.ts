import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleDriverService } from './../../../services/vehicle-driver.service';
import { VehicleDriver } from 'src/app/models/vehicle-driver.model';
import Swal from 'sweetalert2';
import { Conductor } from 'src/app/models/conductor.model';

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
    const currentUrl = this.route.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1; // Modo de ver
    } else if (currentUrl.includes("create")) {
      this.mode = 2; // Modo de crear
    } else if (currentUrl.includes("update")) {
      this.mode = 3; // Modo de actualizar
    } else if (currentUrl.includes("delete")) {
      this.mode = 4; // Modo de eliminar
    }
    if (this.vehiculoDriverId) {
      this.vehicleDriverService.get(this.vehiculoDriverId).subscribe((data: VehicleDriver) => {
        this.vehiculoDriverForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.vehiculoDriverForm = this.theFormBuilder.group({
      fecha_asignacion: ['', Validators.required],
      fecha_desasignacion: ['', Validators.required],
      vehiculo_id: ['', Validators.required],
      conductor_id: ['', Validators.required]
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
