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
  categoryId: number | undefined;
  mode: number = 0; // 1: Ver, 2: Crear, 3: Actualizar
  trySend: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }

    this.categoryId = this.route.snapshot.params['id'];
    if (this.categoryId && this.mode !== 2) {
      this.getCategory(this.categoryId);
    }
  }

  configFormGroup() {
    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required] // Nombre de la categoría
    });
  }

  get formControls() {
    return this.categoryForm.controls;
  }

  getCategory(id: number) {
    this.categoryService.get(id).subscribe((data: Category) => {
      this.categoryForm.patchValue(data);
    });
  }

  handleAction() {
    if (this.mode === 2) {
      this.create();
    } else if (this.mode === 3) {
      this.update();
    }
  }

  create() {
    this.trySend = true;
    if (this.categoryForm.valid) {
      this.categoryService.create(this.categoryForm.value).subscribe(
        () => {
          Swal.fire('Creado', 'La categoría ha sido creada correctamente.', 'success');
          this.router.navigate(['/categories']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al crear la categoría.', 'error');
        }
      );
    }
  }

  update() {
    this.trySend = true;
    if (this.categoryForm.valid) {
      this.categoryService.update(this.categoryId!, this.categoryForm.value).subscribe(
        () => {
          Swal.fire('Actualizado', 'La categoría ha sido actualizada correctamente.', 'success');
          this.router.navigate(['/categories']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al actualizar la categoría.', 'error');
        }
      );
    }
  }
}