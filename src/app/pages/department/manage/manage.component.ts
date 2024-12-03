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
export class ManageComponent implements OnInit {
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
    this.departmentId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.departmentId) {
      this.departmentService.get(this.departmentId).subscribe((data: Department) => {
        this.departmentForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.departmentForm = this.theFormBuilder.group({
      name: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.departmentForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.departmentForm.valid) {
      this.departmentService.create(this.departmentForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Departamento ha sido creado correctamente', 'success');
        this.router.navigate(['/departments']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.departmentForm.valid) {
      this.departmentService.update(this.departmentId, this.departmentForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Departamento ha sido actualizado correctamente', 'success');
        this.router.navigate(['/departments']);
      });
    }
  }
}