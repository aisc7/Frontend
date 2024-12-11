import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../services/category.service';
import { Category } from 'src/app/models/category.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageCategoryComponent implements OnInit {
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
    const currentUrl = this.route.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    } else if (currentUrl.includes("delete")) {
      this.mode = 4; // Modo de eliminación
    }

    if (this.route.snapshot.params.id) {
      this.categoryId = this.route.snapshot.params.id;
      this.getCategory(this.categoryId);
    }
  }

  configFormGroup() {
    this.categoryForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.categoryForm.controls;
  }

  getCategory(id: number) {
    this.categoryService.get(id).subscribe((data) => {
      this.categoryForm.patchValue(data);
    });
  }

  create() {
    this.trySend = true;
    if (this.categoryForm.valid) {
      this.categoryService.create(this.categoryForm.value).subscribe(() => {
        Swal.fire('Creado', 'La categoría ha sido creada correctamente', 'success');
        this.router.navigate(['/categories']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.categoryForm.valid) {
      this.categoryService.update(this.categoryId, this.categoryForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La categoría ha sido actualizada correctamente', 'success');
        this.router.navigate(['/categories']);
      });
    }
  }

  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la categoría.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryService.delete(this.categoryId).subscribe(() => {
          Swal.fire('Eliminado', 'La categoría ha sido eliminada correctamente', 'success');
          this.router.navigate(['/categories']);
        });
      }
    });
  }
}
