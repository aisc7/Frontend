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
export class ManageComponent implements OnInit {
  productForm: FormGroup; // Formulario para el producto
  productId: number; // ID del producto
  mode: number; // Modo de operación: 1 (Ver), 2 (Crear), 3 (Actualizar)
  trySend: boolean = false; // Bandera para intentar enviar el formulario

  constructor(
    private theFormBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1; // Modo Ver
    } else if (currentUrl.includes('create')) {
      this.mode = 2; // Modo Crear
    } else if (currentUrl.includes('update')) {
      this.mode = 3; // Modo Actualizar
    }

    if (this.route.snapshot.params.id) {
      this.productId = this.route.snapshot.params.id;
      this.getProduct(this.productId);
    }
  }

  // Configuración del formulario
  configFormGroup() {
    this.productForm = this.theFormBuilder.group({
      name: ['', Validators.required], // Nombre del producto
      description: ['', Validators.required], // Descripción del producto
      batch_id: ['', Validators.required], // ID del lote
      customer_id: ['', Validators.required] // ID del cliente
    });
  }

  // Obtener controles del formulario
  get getTheFormGroup() {
    return this.productForm.controls;
  }

  // Obtener datos del producto
  getProduct(id: number) {
    this.productService.get(id).subscribe((data) => {
      this.productForm.patchValue(data);
    });
  }

  handleAction() {
    this.trySend = true;
    if (this.productForm.valid) {
      if (this.mode === 2) {
        this.create();
      } else if (this.mode === 3) {
        this.update();
      }
    }
  }

  // Crear un producto
  create() {
    this.trySend = true;
    if (this.productForm.valid) {
      this.productService.create(this.productForm.value).subscribe(
        () => {
          Swal.fire('Creado', 'El producto ha sido creado correctamente.', 'success');
          this.router.navigate(['/products']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al crear el producto.', 'error');
        }
      );
    }
  }

  // Actualizar un producto
  update() {
    this.trySend = true;
    if (this.productForm.valid) {
      this.productService.update(this.productId, this.productForm.value).subscribe(
        () => {
          Swal.fire('Actualizado', 'El producto ha sido actualizado correctamente.', 'success');
          this.router.navigate(['/products']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al actualizar el producto.', 'error');
        }
      );
    }
  }
}