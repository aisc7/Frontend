import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from './../../../services/department.service';
import { Department } from 'src/app/models/department.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageDepartmentComponent implements OnInit {
  departmentForm: FormGroup;
  departmentId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    } else if (currentUrl.includes("delete")) {
      this.mode = 4;
    }

    if (this.route.snapshot.params.id) {
      this.departmentId = this.route.snapshot.params.id;
      this.getDepartment(this.departmentId);
    }
  }

  configFormGroup() {
    this.departmentForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      countryId: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.departmentForm.controls;
  }

  getDepartment(id: number) {
    this.departmentService.get(id).subscribe((data) => {
      this.departmentForm.patchValue(data);
    });
  }

  handleAction() {
    this.trySend = true;
    if (this.departmentForm.valid) {
      switch (this.mode) {
        case 2:  // Crear
          this.create();
          break;
        case 3:  // Actualizar
          this.update();
          break;
        default:
          break;
      }
    }
  }

  create() {
    this.departmentService.create(this.departmentForm.value).subscribe(() => {
      Swal.fire('Creado', 'El departamento ha sido creado correctamente', 'success');
      this.router.navigate(['/departments']);
    });
  }

  update() {
    this.departmentService.update(this.departmentId, this.departmentForm.value).subscribe(() => {
      Swal.fire('Actualizado', 'El departamento ha sido actualizado correctamente', 'success');
      this.router.navigate(['/departments']);
    });
  }

  delete() {
    this.departmentService.delete(this.departmentId).subscribe(() => {
      Swal.fire('Eliminado', 'El departamento ha sido eliminado correctamente', 'success');
      this.router.navigate(['/departments']);
    });
  }
}
