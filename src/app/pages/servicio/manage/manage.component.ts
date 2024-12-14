import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicioService } from './../../../services/servicio.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-servicio',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageServicioComponent implements OnInit {
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
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1; // Visualizar
    } else if (currentUrl.includes('create')) {
      this.mode = 2; // Crear
    } else if (currentUrl.includes('update')) {
      this.mode = 3; // Actualizar
    } else if (currentUrl.includes('delete')) {
      this.mode = 4; // Eliminar
    }

    if (this.route.snapshot.params.id) {
      this.servicioId = this.route.snapshot.params.id;
      this.getServicio(this.servicioId);
    }
  }

  configFormGroup() {
    this.servicioForm = this.theFormBuilder.group({
      descripcion: ['', Validators.required], // Descripción del servicio
      costo: ['', [Validators.required, Validators.min(0)]] // Costo (validación de mínimo 0)
    });
  }

  get getTheFormGroup() {
    return this.servicioForm.controls;
  }

  getServicio(id: number) {
    this.servicioService.get(id).subscribe((data) => {
      this.servicioForm.patchValue(data);
    });
  }

  handleAction() {
    this.trySend = true;
    if (this.servicioForm.valid) {
      if (this.mode === 2) {
        this.create();
      } else if (this.mode === 3) {
        this.update();
      }
    }
  }

  create() {
    this.servicioService.create(this.servicioForm.value).subscribe(
      () => {
        Swal.fire('Creado', 'El servicio ha sido creado correctamente', 'success');
        this.router.navigate(['/servicios']);
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al crear el servicio', 'error');
        console.error(error);
      }
    );
  }

  update() {
    this.servicioService.update(this.servicioId, this.servicioForm.value).subscribe(
      () => {
        Swal.fire('Actualizado', 'El servicio ha sido actualizado correctamente', 'success');
        this.router.navigate(['/servicios']);
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al actualizar el servicio', 'error');
        console.error(error);
      }
    );
  }
}