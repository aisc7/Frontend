import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import { Product } from 'src/app/models/product.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  productForm: FormGroup;
  productId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.productId) {
      this.productService.get(this.productId).subscribe((data: Product) => {
        this.productForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.productForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  get getTheFormGroup() {
    return this.productForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.productForm.valid) {
      this.productService.create(this.productForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Producto ha sido creado correctamente', 'success');
        this.router.navigate(['/products']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.productForm.valid) {
      this.productService.update(this.productId, this.productForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Producto ha sido actualizado correctamente', 'success');
        this.router.navigate(['/products']);
      });
    }
  }
}