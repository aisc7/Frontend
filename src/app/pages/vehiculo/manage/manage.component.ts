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
    this.vehicleId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.vehicleId) {
      this.vehicleService.get(this.vehicleId).subscribe((data: Vehiculo) => {
        this.vehicleForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.vehicleForm = this.theFormBuilder.group({
      make: ['', Validators.required],
      model: ['', Validators.required],
      year: ['', Validators.required]
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
}