import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VehiculoService } from './../../../services/vehiculo.service';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageVehicleComponent implements OnInit {
  vehicleForm: FormGroup;
  vehicleId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private vehicleService: VehiculoService,
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

    this.vehicleId = this.route.snapshot.params['id']; // Obtener el id desde la ruta
    if (this.vehicleId) {
      this.vehicleService.get(this.vehicleId).subscribe((data: Vehiculo) => {
        this.vehicleForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.vehicleForm = this.theFormBuilder.group({
      tipo_vehiculo: ['', Validators.required],
      capacidad_peso: ['', Validators.required],
      capacidad_volumen: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.vehicleForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.vehicleForm.valid) {
      this.vehicleService.create(this.vehicleForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Vehículo ha sido creado correctamente', 'success');
        this.router.navigate(['/vehicles']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.vehicleForm.valid) {
      this.vehicleService.update(this.vehicleId, this.vehicleForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Vehículo ha sido actualizado correctamente', 'success');
        this.router.navigate(['/vehicles']);
      });
    }
  }

  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este vehículo será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.vehicleService.delete(this.vehicleId).subscribe(() => {
          Swal.fire('Eliminado', 'El vehículo ha sido eliminado', 'success');
          this.router.navigate(['/vehicles']);
        });
      }
    });
  }
}
