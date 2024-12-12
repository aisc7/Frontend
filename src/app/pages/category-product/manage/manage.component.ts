import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryProductService } from './../../../services/category-product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageCategoryProductComponent implements OnInit {
  categoryProductForm: FormGroup;
  categoryProductId: number | null = null;
  mode: number = 2;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private categoryProductService: CategoryProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");
    this.mode = this.getModeFromUrl(currentUrl);

    if (this.route.snapshot.params.id) {
      this.categoryProductId = +this.route.snapshot.params.id;
      this.getCategoryProduct(this.categoryProductId);
    }
  }

  configFormGroup() {
    this.categoryProductForm = this.theFormBuilder.group({
      fecha_asignacion: ['', Validators.required],
      fecha_designacion: ['', Validators.required],
      producto_id: ['', Validators.required],
      category_id: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.categoryProductForm.controls;
  }

  getModeFromUrl(url: string): number {
    if (url.includes("view")) return 1;
    if (url.includes("create")) return 2;
    if (url.includes("update")) return 3;
    if (url.includes("delete")) return 4;
    return 2; // Default: Crear
  }

  getCategoryProduct(id: number) {
    this.categoryProductService.get(id).subscribe((data) => {
      this.categoryProductForm.patchValue(data);
    });
  }

  handleAction() {
    this.trySend = true;

    if (!this.categoryProductForm.valid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    switch (this.mode) {
      case 2:
        this.categoryProductService.create(this.categoryProductForm.value).subscribe(() => {
          Swal.fire('Creado', 'El producto de categoría ha sido creado correctamente.', 'success');
          this.router.navigate(['/category-products']);
        });
        break;

      case 3:
        if (this.categoryProductId !== null) {
          this.categoryProductService.update(this.categoryProductId, this.categoryProductForm.value).subscribe(() => {
            Swal.fire('Actualizado', 'El producto de categoría ha sido actualizado correctamente.', 'success');
            this.router.navigate(['/category-products']);
          });
        }
        break;

      case 1:
        if (this.categoryProductId !== null) {
          Swal.fire({
            title: "Eliminar",
            text: "¿Está seguro que desea eliminar este producto de categoría?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              this.categoryProductService.delete(this.categoryProductId).subscribe(() => {
                Swal.fire('Eliminado', 'El producto de categoría ha sido eliminado correctamente.', 'success');
                this.router.navigate(['/category-products']);
              });
            }
          });
        }
        break;

      default:
        Swal.fire('Error', 'Modo no reconocido.', 'error');
    }
  }
}
