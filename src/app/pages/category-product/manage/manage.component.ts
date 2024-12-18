import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryProductService } from './../../../services/category-product.service';
import Swal from 'sweetalert2';
import { CategoryProduct } from 'src/app/models/category-product.model';
import { Category } from 'src/app/models/category.model';
import { Product } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductRoutingModule } from '../../product/product-routing.module';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageCategoryProductComponent implements OnInit {
  categoryProductForm: FormGroup;
  relationId: number;
  mode: number;
  trySend: boolean = false;
  categoryProduct:CategoryProduct;
  categories:Category[];
  products:Product[];

  constructor(
    private formBuilder: FormBuilder,
    private categoryProductService: CategoryProductService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService:CategoryService,
    private productsService:ProductService
  ) {
    this.categories=[];
    this.products=[];
    this.configFormGroup();
    this.categoryProduct={id:0, fecha_asignacion:null, fecha_desasignacion:null, product:{id:0}, category:{id:0} }
  }

  
  categoriesList(){
    this.categoryService.list().subscribe(data=>{
      this.categories=data;
    })
  }

  
  productsList(){
    this.productsService.list().subscribe(data=>{
      this.products=data;
    })
  }

  ngOnInit(): void {
    this.productsList();
    this.categoriesList();
    this.configFormGroup();
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1; // Ver
    } else if (currentUrl.includes('create')) {
      this.mode = 2; // Crear
    } else if (currentUrl.includes('update')) {
      this.mode = 3; // Actualizar
    }

    if (this.route.snapshot.params.id) {
      this.relationId = this.route.snapshot.params.id;
      this.getCategoryProduct(this.relationId);
    }
  }

  configFormGroup() {
    this.categoryProductForm = this.formBuilder.group({
      fecha_asignacion: ['', Validators.required],
      fecha_desasignacion: [''],
      product_id: [null, Validators.required],
      category_id: [null, Validators.required],
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

  handleAction() {
    if (this.mode === 2) {
      this.create();
    } else if (this.mode === 3) {
      this.update();
    }
  }

  create() {
    this.trySend = true;
    if (this.categoryProductForm.valid) {
      this.categoryProductService.create(this.categoryProductForm.value).subscribe(() => {
        Swal.fire('Creado', 'La relación categoría-producto ha sido creada correctamente', 'success');
        this.router.navigate(['/category-products']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.categoryProductForm.valid) {
      this.categoryProductService.update(this.relationId, this.categoryProductForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La relación categoría-producto ha sido actualizada correctamente', 'success');
        this.router.navigate(['/category-products']);
      });
    }
  }
}