import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleDriverService } from './../../../services/vehicle-driver.service';
import { VehicleDriver } from 'src/app/models/vehicle-driver.model';
import Swal from 'sweetalert2';
import { Conductor } from 'src/app/models/conductor.model';

@Component({
  selector: 'app-manage-vehiculo-driver',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageVehiculoDriverComponent implements OnInit {
  vehiculoDriverForm: FormGroup;
  vehiculoDriverId: number | undefined;
  mode: number = 0; // 1: Ver, 2: Crear, 3: Actualizar
  trySend: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private vehiculoDriverService: VehicleDriverService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    this.vehiculoDriverId = this.route.snapshot.params['id'];
    if (this.vehiculoDriverId && this.mode !== 2) {
      this.getVehiculoDriver(this.vehiculoDriverId);
    }
  }

  configFormGroup() {
    this.vehiculoDriverForm = this.formBuilder.group({
      fecha_asignacion: ['', Validators.required],
      fecha_desasignacion: ['', Validators.required],
      vehiculo_id: ['', Validators.required],
      conductor_id: ['', Validators.required]
    });
  }

  get formControls() {
    return this.vehiculoDriverForm.controls;
  }

  getVehiculoDriver(id: number) {
    this.vehiculoDriverService.get(id).subscribe((data: VehicleDriver) => {
      this.vehiculoDriverForm.patchValue(data);
    });
  }

  handleAction() {
    if (this.mode === 2) {
      this.create();
    } else if (this.mode === 3) {
      this.update();
    }
  }

  create() {
    this.trySend = true;
    if (this.vehiculoDriverForm.valid) {
      this.vehiculoDriverService.create(this.vehiculoDriverForm.value).subscribe(
        () => {
          Swal.fire('Creado', 'La relación ha sido creada correctamente.', 'success');
          this.router.navigate(['/vehiculo-drivers']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al crear la relación.', 'error');
        }
      );
    }
  }

  update() {
    this.trySend = true;
    if (this.vehiculoDriverForm.valid) {
      this.vehiculoDriverService.update(this.vehiculoDriverId!, this.vehiculoDriverForm.value).subscribe(
        () => {
          Swal.fire('Actualizado', 'La relación ha sido actualizada correctamente.', 'success');
          this.router.navigate(['/vehiculo-drivers']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al actualizar la relación.', 'error');
        }
      );
    }
  }
}