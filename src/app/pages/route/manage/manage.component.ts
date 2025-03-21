import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteService } from './../../../services/route.service';
import { Route } from 'src/app/models/route.model';
import Swal from 'sweetalert2';
import { Contract } from 'src/app/models/contract.model';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { ContractService } from 'src/app/services/contract.service';
import { VehiculoService } from 'src/app/services/vehiculo.service';

@Component({
  selector: 'app-manage-route',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageRouteComponent implements OnInit {
  routeForm: FormGroup;
  routeId: number;
  mode: number;
  trySend: boolean = false;
  route:Route;
  contracts:Contract[];
  vehiculos: Vehiculo[];

  constructor(
    private theFormBuilder: FormBuilder,
    private routeService: RouteService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private contractsService:ContractService, 
    private vehiculosService:VehiculoService
  ) {
    this.contracts=[];
    this.vehiculos=[];
    this.configFormGroup();
    this.route={id:0, starting_place:"", ending_place:"", distance:0, delivery_date:null, contract:{}, vehiculo:{}}
  }

  vehiculosList(){
    this.vehiculosService.list().subscribe(data=>{
      this.vehiculos=data;
    })
  }
  
  contractsList(){
    this.contractsService.list().subscribe(data=>{
      this.contracts=data;
    })
  }

  ngOnInit(): void {
    this.contractsList();
    this.vehiculosList();
    this.configFormGroup();
    const currentUrl = this.activatedRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1; // Modo de ver
    } else if (currentUrl.includes("create")) {
      this.mode = 2; // Modo de crear
    } else if (currentUrl.includes("update")) {
      this.mode = 3; // Modo de actualizar
    } else if (currentUrl.includes("delete")) {
      this.mode = 4; // Modo de eliminar
    }

    this.routeId = this.activatedRoute.snapshot.params['id'];
    if (this.routeId) {
      this.routeService.get(this.routeId).subscribe((data: Route) => {
        this.routeForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.routeForm = this.theFormBuilder.group({
      starting_place: ['', Validators.required],
      ending_place: ['', Validators.required],
      distance: ['', [Validators.required, Validators.min(1)]],
      delivery_date: ['', Validators.required],
      contract_id: [null, Validators.required],
      vehiculo_id: [null, Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.routeForm.controls;
  }

  handleAction() {
    this.trySend = true;
    if (this.routeForm.valid) {
      if (this.mode === 2) {
        this.create();
      } else if (this.mode === 3) {
        this.update();
      }
    }
  }

  create() {
    console.log(JSON.stringify(this.route))
    this.trySend = true;
    if (this.routeForm.valid) {
      this.routeService.create(this.routeForm.value).subscribe(() => {
        Swal.fire('Creado', 'La ruta ha sido creada correctamente', 'success');
        this.router.navigate(['/routes']);
      });
    }else {
          Swal.fire('Error', 'Complete todos los campos obligatorios', 'error');
        }
  }

  update() {
    this.trySend = true;
    if (this.routeForm.valid) {
      this.routeService.update(this.routeId, this.routeForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La ruta ha sido actualizada correctamente', 'success');
        this.router.navigate(['/routes']);
      });
    }
  }

  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta ruta será eliminada!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.routeService.delete(this.routeId).subscribe(() => {
          Swal.fire('Eliminado', 'La ruta ha sido eliminada', 'success');
          this.router.navigate(['/routes']);
        });
      }
    });
  }
}