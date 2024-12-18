import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OperationService } from './../../../services/operation.service';
import { Operation } from 'src/app/models/operation.model';
import Swal from 'sweetalert2';
import { Municipality } from 'src/app/models/municipality.model';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { MunicipalityService } from 'src/app/services/municipality.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  operationForm: FormGroup;
  operationId: number;
  mode: number;
  trySend: boolean = false;
  operation: Operation;
  municipalities: Municipality[] = [];
  vehiculos: Vehiculo[] = [];
  municipality_id: number;
  vehiculo_id: number;
  
  constructor(
    private theFormBuilder: FormBuilder,
    private operationService: OperationService,
    private router: Router,
    private route: ActivatedRoute,
    private municipalitiesService: MunicipalityService,
    private vehiculosService: VehiculoService,
    private activatedRoute: ActivatedRoute
  ) {
    this.operation = {
      id: 0, 
      start_date: null, 
      end_date: null, 
      municipality: { id: null }, 
      vehiculo: { id: null } 
    };
    this.configFormGroup();
  }

  vehiculosList() {
    this.vehiculosService.list().subscribe(data => {
      this.vehiculos = data;
    });
  }

  municipalitiesList() {
    this.municipalitiesService.list().subscribe(data => {
      this.municipalities = data;
    });
  }

  ngOnInit(): void {
    this.vehiculosList();
    this.municipalitiesList();
    
    const currentUrl = this.route.snapshot.url.join("/");
    this.operationId = Number(this.route.snapshot.params['id']);
  
    if (currentUrl.includes("createForMunicipality")) {
      this.mode = 4;
      this.municipality_id = Number(this.activatedRoute.snapshot.params['municipality_id']);
      if (this.municipality_id) {
        this.operation.municipality = { id: this.municipality_id };
        this.operationForm.patchValue({ municipality: this.operation.municipality });
        this.operationForm.get("municipality").disable();
      }
    } else if (currentUrl.includes("createForVehiculo")) {
      this.mode = 5;
      this.vehiculo_id = Number(this.activatedRoute.snapshot.params['vehicle_id']);
      if (this.vehiculo_id) {
        this.operation.vehiculo = { id: this.vehiculo_id };
        this.operationForm.patchValue({ vehiculo: this.operation.vehiculo });
        this.operationForm.get("vehiculo").disable();
      }
    } else if (currentUrl.includes("update")) {
      this.mode = 3; // Update mode
    } else if (currentUrl.includes("delete")) {
      this.mode = 4; // Delete mode
    }
  
    // If operation ID exists in URL, fetch operation data
    if (this.operationId) {
      this.operationService.get(this.operationId).subscribe((data: Operation) => {
        this.operationForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.operationForm = this.theFormBuilder.group({
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      municipality: [null, Validators.required],
      vehiculo: [null, Validators.required]
    });
  }
  
  get getTheFormGroup() {
    return this.operationForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.operationForm.valid) {
      this.operationService.create(this.operationForm.value).subscribe(() => {
        Swal.fire('Creado', 'La Operación ha sido creada correctamente', 'success');
        this.router.navigate(['/operations']);
      });
    }
  }

  
  
  update() {
    this.trySend = true;
    if (this.operationForm.valid) {
      this.operationService.update(this.operationId, this.operationForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La Operación ha sido actualizada correctamente', 'success');
        this.router.navigate(['/operations']);
      });
    }
  }

  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la operación.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.operationService.delete(this.operationId).subscribe(() => {
          Swal.fire('Eliminado', 'La operación ha sido eliminada correctamente', 'success');
          this.router.navigate(['/operations']);
        });
      }
    });
  }
}