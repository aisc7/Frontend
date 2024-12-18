import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryProduct } from 'src/app/models/category-product.model';
import { CategoryProductService } from 'src/app/services/category-product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  categoryProducts: CategoryProduct[];
  product_id:number;
  category_id:number;

  constructor(private categoryProductService: CategoryProductService, private router: Router, private activatedRoute:ActivatedRoute) {
    console.log('Constructor');
    this.categoryProducts = [];
  }

  ngOnInit(): void {
    this.product_id= this.activatedRoute.snapshot.params['id'];
    const currentUrl = this.activatedRoute.snapshot.url.join('/');

    if(currentUrl.includes('filterByProduct')){
      this.filterByProduct();
    }
    else if(currentUrl.includes('filterByCategory')){
      this.filterByCategory();
    }
    else{
      this.list() //lista por defecto 
    }
  }

  list() {
    this.categoryProductService.list().subscribe((data) => {
      this.categoryProducts = data;
      console.log('Datos recibidos:', data);
    });
  }

  delete(id: number) {
    Swal.fire({
      title: 'Eliminación',
      text: 'Está seguro que quiere eliminar este registro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoryProductService.delete(id).subscribe((data) => {
          this.ngOnInit();
          Swal.fire({
            title: 'Eliminado',
            text: 'Se ha eliminado correctamente',
            icon: 'success',
          });
        });
      }
    });
  }
  
  create() {
    this.router.navigate(['categoria-producto/create']);
  }

  view(id: number) {
    this.router.navigate(['categoria-producto/view', id]);
  }

  update(id: number) {
    this.router.navigate(['categoria-producto/update', id]);
  }

  filterByProduct(){
    this.categoryProductService.listByProduct(this.product_id).subscribe(data=>{
      this.categoryProducts=data;
      console.log(this.categoryProducts);
      
    })
  }
  filterByCategory(){
    this.categoryProductService.listByCategory(this.category_id).subscribe(data=>{
      this.categoryProducts=data;
      console.log(this.categoryProducts);
    })
  }

}