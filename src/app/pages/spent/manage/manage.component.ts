import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SpentService } from './../../../services/spent.service';
import { Spent } from 'src/app/models/spent.model';
import Swal from 'sweetalert2';
import { FacturaService } from 'src/app/services/factura.service';
import { Factura } from 'src/app/models/factura.model';
import { Dueno } from 'src/app/models/dueno.model';
import { Conductor } from 'src/app/models/conductor.model';
import { Servicio } from 'src/app/models/servicio.model';
import { DuenoService } from 'src/app/services/dueno.service';
import { ConductorService } from 'src/app/services/conductor.service';
import { ServicioService } from 'src/app/services/servicio.service';

@Component({
  selector: 'app-manage-spent',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageSpentComponent implements OnInit {
  spentForm: FormGroup;
  spentId: number | undefined;
  mode: number = 0; // 1: Ver, 2: Crear, 3: Actualizar
  trySend: boolean = false;
  spent:Spent;
  duenos:Dueno[];
  conductors:Conductor[];
  servicios:Servicio[];

  constructor(
    private formBuilder: FormBuilder,
    private spentService: SpentService,
    private router: Router,
    private route: ActivatedRoute,
    private facturasService:FacturaService,
    private duenosService:DuenoService,
    private conductorsService:ConductorService,
    private serviciosService:ServicioService
  ) {
    this.duenos=[],
    this.conductors=[],
    this.servicios=[],
    this.configFormGroup();
    this.spent={id:0, description:"", monto:0, date:"", servicio:{id:null}, conductor:{id:null}, dueno:{id:null}}
  }

  get getTheFormGroup() {
    return this.spentForm.controls;
  }

  serviciosList(){
    this.serviciosService.list().subscribe(data=>{
      this.servicios=data
      console.log(this.servicios);
  })}

  duenosList(){
    this.duenosService.list().subscribe(data=>{
      this.duenos=data
      console.log(this.duenos);
  })}

  conductorsList(){
    this.conductorsService.list().subscribe(data=>{
      this.conductors=data
      console.log(this.conductors);
  })}

  ngOnInit(): void {
    this.serviciosList();
    this.duenosList();
    this.conductorsList();
    this.configFormGroup();
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    this.spentId = this.route.snapshot.params['id'];
    if (this.spentId && this.mode !== 2) {
      this.getSpent(this.spentId);
    }
  }

  configFormGroup() {
    this.spentForm = this.formBuilder.group({
      description: ['', Validators.required],
      monto: ['', Validators.required],
      date: ['', Validators.required],
      servicio_id: [null, Validators.required],
      conductor_id: [null, Validators.required],
      dueno_id: [null, Validators.required],
   
    });
  }

  get formControls() {
    return this.spentForm.controls;
  }

  getSpent(id: number) {
    this.spentService.get(id).subscribe((data: Spent) => {
      this.spentForm.patchValue(data);
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
    console.log(JSON.stringify(this.spent))
    this.trySend = true;
    if (this.spentForm.valid) {
      this.spentService.create(this.spentForm.value).subscribe(
        () => {
          Swal.fire('Creado', 'El gasto ha sido creado correctamente.', 'success');
          this.router.navigate(['/spents']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al crear el gasto.', 'error');
        }
      );
    }
  }

  update() {
    this.trySend = true;
    if (this.spentForm.valid) {
      this.spentService.update(this.spentId!, this.spentForm.value).subscribe(
        () => {
          Swal.fire('Actualizado', 'El gasto ha sido actualizado correctamente.', 'success');
          this.router.navigate(['/spents']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al actualizar el gasto.', 'error');
        }
      );
    }
  }
}