import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { Category } from 'src/app/models/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.categoryId) {
      this.categoryService.get(this.categoryId).subscribe((data: Category) => {
        this.categoryForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.categoryForm = this.theFormBuilder.group({
      name: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.categoryForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.categoryForm.valid) {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        Swal.fire('Creado', 'La Categoría ha sido creada correctamente', 'success');
        this.router.navigate(['/categories']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.categoryForm.valid) {
      this.categoryService.update(this.categoryId, this.categoryForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La Categoría ha sido actualizada correctamente', 'success');
        this.router.navigate(['/categories']);
      });
    }
  }
}