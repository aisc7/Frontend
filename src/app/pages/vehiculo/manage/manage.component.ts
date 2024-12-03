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
export class ManageComponent implements OnInit {
  vehicleForm: FormGroup;
  vehicleId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private vehiculoService: VehiculoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.vehicleId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.vehicleId) {
      this.vehiculoService.get(this.vehicleId).subscribe((data: Vehiculo) => {
        this.vehicleForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.vehicleForm = this.theFormBuilder.group({
      plate: ['', Validators.required],
      brand: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', [Validators.required, Validators.min(1900)]]
    });
  }

  get getTheFormGroup() {
    return this.vehicleForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.vehicleForm.valid) {
      this.vehiculoService.create(this.vehicleForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Vehículo ha sido creado correctamente', 'success');
        this.router.navigate(['/vehiculos']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.vehicleForm.valid) {
      this.vehiculoService.update(this.vehicleId, this.vehicleForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Vehículo ha sido actualizado correctamente', 'success');
        this.router.navigate(['/vehiculos']);
      });
    }
  }
}