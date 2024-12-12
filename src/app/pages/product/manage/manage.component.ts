import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from './../../../services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit { // Cambiado a "ManageComponent"
  productForm: FormGroup; // Cambiar el nombre según contexto (antes era ownerVehicleForm)
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
    const currentUrl = this.route.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
  
    if (this.route.snapshot.params.id) {
      this.productId = this.route.snapshot.params.id;
      this.getProduct(this.productId);
    }
  }

  configFormGroup() {
    this.productForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
     batch_id: ['', Validators.required],
     customer_id: ['', Validators.required],
    });
  }

  get getTheFormGroup() {
    return this.productForm.controls;
  }

  getProduct(id: number) {
    this.productService.get(id).subscribe((data) => {
      this.productForm.patchValue(data);
    });
  }

  create() {
    this.trySend = true;
    if (this.productForm.valid) {
      this.productService.create(this.productForm.value).subscribe(() => {
        Swal.fire('Creado', 'El producto ha sido creado correctamente', 'success');
        this.router.navigate(['/products']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.productForm.valid) {
      this.productService.update(this.productId, this.productForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El producto ha sido actualizado correctamente', 'success');
        this.router.navigate(['/products']);
      });
    }
  }
}
