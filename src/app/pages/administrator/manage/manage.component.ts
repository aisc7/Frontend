import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministratorService } from './../../../services/administrator.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-administrator',
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
      this.administratorId = this.route.snapshot.params.id;
      this.getAdministrator(this.administratorId);
    }
  }

  configFormGroup() {
    this.administratorForm = this.theFormBuilder.group({
      user_id: ['', Validators.required], // ID de usuario
      servicio_id: ['', Validators.required], // ID del servicio
    });
  }

  get getTheFormGroup() {
    return this.administratorForm.controls;
  }

  getAdministrator(id: number) {
    this.administratorService.get(id).subscribe((data) => {
      this.administratorForm.patchValue(data);
    });
  }

  handleAction() {
    this.trySend = true;
    if (this.administratorForm.valid) {
      if (this.mode === 2) {
        this.create();
      } else if (this.mode === 3) {
        this.update();
      }
    }
  }

  create() {
    this.administratorService.create(this.administratorForm.value).subscribe(
      () => {
        Swal.fire('Creado', 'El administrador ha sido creado correctamente', 'success');
        this.router.navigate(['/administrators']);
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al crear el administrador', 'error');
        console.error(error);
      }
    );
  }

  update() {
    this.administratorService.update(this.administratorId, this.administratorForm.value).subscribe(
      () => {
        Swal.fire('Actualizado', 'El administrador ha sido actualizado correctamente', 'success');
        this.router.navigate(['/administrators']);
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al actualizar el administrador', 'error');
        console.error(error);
      }
    );
  }
}