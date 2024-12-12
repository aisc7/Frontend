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

    this.servicioId = this.route.snapshot.params['id']; // Obtener el id desde la ruta
    if (this.servicioId) {
      this.servicioService.get(this.servicioId).subscribe((data: Servicio) => {
        this.servicioForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.servicioForm = this.theFormBuilder.group({
      descripcion: ['', Validators.required],
      costo: ['', Validators.required]
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

  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este servicio será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioService.delete(this.servicioId).subscribe(() => {
          Swal.fire('Eliminado', 'El servicio ha sido eliminado', 'success');
          this.router.navigate(['/servicios']);
        });
      }
    });
  }
}
