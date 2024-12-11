import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministratorService } from './../../../services/administrator.service';
import { Administrator } from 'src/app/models/administrator.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageAdministratorComponent implements OnInit {
  administratorForm: FormGroup;
  administratorId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private administratorService: AdministratorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");

    // Usamos switch para gestionar los diferentes modos
    switch (true) {
      case currentUrl.includes("view"):
        this.mode = 1; // Modo de ver
        break;
      case currentUrl.includes("create"):
        this.mode = 2; // Modo de crear
        break;
      case currentUrl.includes("update"):
        this.mode = 3; // Modo de actualizar
        break;
      case currentUrl.includes("delete"):
        this.mode = 4; // Modo de eliminar
        break;
      default:
        this.mode = 1; // Default a "view"
    }

    // Si la URL incluye un `id`, cargamos el administrador específico
    if (this.route.snapshot.params.id) {
      this.administratorId = this.route.snapshot.params.id;
      this.getAdministrator(this.administratorId);
    }
  }

  configFormGroup() {
    this.administratorForm = this.theFormBuilder.group({
      userId: ['', Validators.required],
      servicioId: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.administratorForm.controls;
  }

  // Obtener administrador por ID
  getAdministrator(id: number) {
    this.administratorService.get(id).subscribe((data: Administrator) => {
      this.administratorForm.patchValue(data);
    });
  }

  // Crear nuevo administrador
  create() {
    this.trySend = true;
    if (this.administratorForm.valid) {
      this.administratorService.create(this.administratorForm.value).subscribe(() => {
        Swal.fire('Creado', 'El administrador ha sido creado correctamente', 'success');
        this.router.navigate(['/administrators']);
      });
    }
  }

  // Actualizar administrador existente
  update() {
    this.trySend = true;
    if (this.administratorForm.valid) {
      this.administratorService.update(this.administratorId, this.administratorForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El administrador ha sido actualizado correctamente', 'success');
        this.router.navigate(['/administrators']);
      });
    }
  }

  // Eliminar administrador
  delete(id: number) {
    Swal.fire({
      title: "Eliminación",
      text: "Está seguro que quiere eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No, cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.administratorService.delete(id).subscribe(() => {
          Swal.fire({
            title: "Eliminado",
            text: "Se ha eliminado correctamente",
            icon: "success"
          });
          this.router.navigate(['/administrators']);
        });
      }
    });
  }

  // Método para manejar el envío del formulario según el modo
  handleFormAction() {
    switch (this.mode) {
      case 1: // Modo de ver
        break;
      case 2: // Modo de crear
        this.create();
        break;
      case 3: // Modo de actualizar
        this.update();
        break;
      case 4: // Modo de eliminar
        this.delete(this.administratorId);
        break;
      default:
        break;
    }
  }

  // Cancelar operación y volver a la lista de administradores
  cancel() {
    this.router.navigate(['/administrators']);
  }
}
