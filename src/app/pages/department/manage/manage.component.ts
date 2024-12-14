import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from './../../../services/department.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-department',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageDepartmentComponent implements OnInit {
  departmentForm: FormGroup; // Declaración única
  departmentId: number; // ID del departamento
  mode: number; // Modo de operación (view, create, update, delete)
  trySend: boolean = false; // Validación de formulario enviado

  constructor(
    private theFormBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup(); // Configuración del formulario reactivo
  }

  ngOnInit(): void {
    // Determinar el modo de operación (view, create, update, delete) basado en la URL
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

    // Si hay un ID en los parámetros de la ruta, obtener los datos del departamento
    if (this.route.snapshot.params.id) {
      this.departmentId = this.route.snapshot.params.id;
      this.getDepartment(this.departmentId);
    }
  }

  // Configuración del formulario reactivo
  configFormGroup() {
    this.departmentForm = this.theFormBuilder.group({
      name: ['', Validators.required], // Nombre del departamento
      description: [''], // Descripción opcional
    });
  }

  // Acceso rápido a los controles del formulario
  get getTheFormGroup() {
    return this.departmentForm.controls;
  }

  // Obtener departamento para actualizar o visualizar
  getDepartment(id: number) {
    this.departmentService.get(id).subscribe((data) => {
      this.departmentForm.patchValue(data); // Rellenar formulario con los datos del departamento
    });
  }

  // Manejar acción de creación o actualización
  handleAction() {
    this.trySend = true;
    if (this.departmentForm.valid) {
      if (this.mode === 2) {
        this.create(); // Crear
      } else if (this.mode === 3) {
        this.update(); // Actualizar
      }
    }
  }

  // Crear departamento
  create() {
    this.departmentService.create(this.departmentForm.value).subscribe(
      () => {
        Swal.fire('Creado', 'El departamento ha sido creado correctamente', 'success');
        this.router.navigate(['/departments']); // Navegar a la lista de departamentos
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al crear el departamento', 'error');
        console.error(error);
      }
    );
  }

  // Actualizar departamento
  update() {
    this.departmentService.update(this.departmentId, this.departmentForm.value).subscribe(
      () => {
        Swal.fire('Actualizado', 'El departamento ha sido actualizado correctamente', 'success');
        this.router.navigate(['/departments']); // Navegar a la lista de departamentos
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al actualizar el departamento', 'error');
        console.error(error);
      }
    );
  }

  // Eliminar departamento
  delete() {
    this.departmentService.delete(this.departmentId).subscribe(
      () => {
        Swal.fire('Eliminado', 'El departamento ha sido eliminado correctamente', 'success');
        this.router.navigate(['/departments']); // Navegar a la lista de departamentos
      },
      (error) => {
        Swal.fire('Error', 'Ocurrió un error al eliminar el departamento', 'error');
        console.error(error);
      }
    );
  }
}