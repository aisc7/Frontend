import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryProductService } from './../../../services/category-product.service';
import { CategoryProduct } from 'src/app/models/category-product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageCategoryProductComponent implements OnInit {
  categoryProductForm: FormGroup;
  categoryProductId: number;
  mode: number;
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
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }else if (currentUrl.includes("delete")) {
      this.mode = 4;
    }
    console.log('mode:', this.mode);
  
    if (this.route.snapshot.params.id) {
      this.categoryProductId = this.route.snapshot.params.id;
      this.getCategoryProduct(this.categoryProductId);
    }
  }

  configFormGroup() {
    this.categoryProductForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.categoryProductForm.controls;
  }

  getCategoryProduct(id: number) {
    this.categoryProductService.get(id).subscribe((data) => {
      this.categoryProductForm.patchValue(data);
    });
  }

  create() {
    this.trySend = true;
    if (this.categoryProductForm.valid) {
      this.categoryProductService.create(this.categoryProductForm.value).subscribe(() => {
        Swal.fire('Creado', 'El producto de categoría ha sido creado correctamente', 'success');
        this.router.navigate(['/category-products']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.categoryProductForm.valid) {
      this.categoryProductService.update(this.categoryProductId, this.categoryProductForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El producto de categoría ha sido actualizado correctamente', 'success');
        this.router.navigate(['/category-products']);
      });
    }
  }
  delete () {
    this.trySend = true;
    if (this.categoryProductForm.valid) {
      this.categoryProductService.delete(this.categoryProductId).subscribe(() => {
        Swal.fire('Eliminado', 'El producto de categoría ha sido eliminado correctamente', 'success');
        this.router.navigate(['/category-products']);
      });
    }
  }
}