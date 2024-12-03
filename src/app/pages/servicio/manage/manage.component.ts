import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicioService } from './../../../services/servicio.service';
import { Servicio } from 'src/app/models/servicio.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  servicioForm: FormGroup;
  servicioId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private servicioService: ServicioService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.servicioId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.servicioId) {
      this.servicioService.get(this.servicioId).subscribe((data: Servicio) => {
        this.servicioForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.servicioForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.servicioForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.servicioForm.valid) {
      this.servicioService.create(this.servicioForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Servicio ha sido creado correctamente', 'success');
        this.router.navigate(['/servicios']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.servicioForm.valid) {
      this.servicioService.update(this.servicioId, this.servicioForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Servicio ha sido actualizado correctamente', 'success');
        this.router.navigate(['/servicios']);
      });
    }
  }
}