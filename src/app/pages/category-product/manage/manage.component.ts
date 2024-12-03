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
export class ManageComponent implements OnInit {
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
    this.categoryProductId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.categoryProductId) {
      this.categoryProductService.get(this.categoryProductId).subscribe((data: CategoryProduct) => {
        this.categoryProductForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.categoryProductForm = this.theFormBuilder.group({
      name: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.categoryProductForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.categoryProductForm.valid) {
      this.categoryProductService.create(this.categoryProductForm.value).subscribe(() => {
        Swal.fire('Creado', 'La Categoría de Producto ha sido creada correctamente', 'success');
        this.router.navigate(['/category-products']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.categoryProductForm.valid) {
      this.categoryProductService.update(this.categoryProductId, this.categoryProductForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La Categoría de Producto ha sido actualizada correctamente', 'success');
        this.router.navigate(['/category-products']);
      });
    }
  }
}