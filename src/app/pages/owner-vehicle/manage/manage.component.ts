import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OwnerVehicleService } from './../../../services/owner-vehicle.service';
import { OwnerVehicle } from 'src/app/models/owner-vehicle.model';
import Swal from 'sweetalert2';
import { Dueno } from 'src/app/models/dueno.model';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { DuenoService } from 'src/app/services/dueno.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-manage-owner-vehicle',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageOwnerVehicleComponent implements OnInit {
  ownerVehicleForm: FormGroup;
  ownerVehicleId: number | undefined;
  mode: number = 0; // 1: Ver, 2: Crear, 3: Actualizar
  trySend: boolean = false;
  ownerVehiculo:OwnerVehicle;
  duenos:Dueno[];
  vehiculos:Vehiculo[];


  constructor(
    private formBuilder: FormBuilder,
    private ownerVehicleService: OwnerVehicleService,
    private router: Router,
    private route: ActivatedRoute,
    private duenosService:DuenoService,
    private vehiculosService:VehiculoService
  ) {
    this.vehiculos=[];
    this.duenos=[];
    this.configFormGroup();
    this.ownerVehiculo={id:0, fecha_asignacion:null, fecha_desasignacion:null, vehiculo:{id:null}, dueno:{id:null} }
  }


  vehiculosList(){
    this.vehiculosService.list().subscribe(data=>{
      this.vehiculos=data;
    })
  }

  duenosList(){
    this.duenosService.list().subscribe(data=>{
      this.duenos=data
      console.log(this.duenos);
  })}
  

  ngOnInit(): void {
    this.vehiculosList();
    this.duenosList();
    this.configFormGroup();
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    this.ownerVehicleId = this.route.snapshot.params['id'];
    if (this.ownerVehicleId && this.mode !== 2) {
      this.getOwnerVehicle(this.ownerVehicleId);
    }
  }

  configFormGroup() {
    this.ownerVehicleForm = this.formBuilder.group({
      fecha_asignacion: ['', Validators.required],
      fecha_desasignacion: ['', Validators.required],
      vehiculo_id: [null, Validators.required],
      dueno_id: [null, Validators.required]
    });
  }

  get formControls() {
    return this.ownerVehicleForm.controls;
  }

  getOwnerVehicle(id: number) {
    this.ownerVehicleService.get(id).subscribe((data: OwnerVehicle) => {
      this.ownerVehicleForm.patchValue(data);
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
    console.log(JSON.stringify(this.ownerVehiculo))
    this.trySend = true;
    if (this.ownerVehicleForm.valid) {
      this.ownerVehicleService.create(this.ownerVehicleForm.value).subscribe(
        () => {
          Swal.fire('Creado', 'La relación ha sido creada correctamente.', 'success');
          this.router.navigate(['/owner-vehicles']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al crear la relación.', 'error');
        }
      );
    }
  }

  get getTheFormGroup() {
    return this.ownerVehicleForm.controls;
  }


  update() {
    this.trySend = true;
    if (this.ownerVehicleForm.valid) {
      this.ownerVehicleService.update(this.ownerVehicleId!, this.ownerVehicleForm.value).subscribe(
        () => {
          Swal.fire('Actualizado', 'La relación ha sido actualizada correctamente.', 'success');
          this.router.navigate(['/owner-vehicles']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al actualizar la relación.', 'error');
        }
      );
    }
  }
}