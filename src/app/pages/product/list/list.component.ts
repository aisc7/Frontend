import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  products: Product[];
  customer_id: number;
  batch_id: number;
  

  constructor(private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('Constructor');
    this.products = [];
  }

  ngOnInit(): void {
    this.customer_id= this.activatedRoute.snapshot.params['id'];
    this.batch_id = this.activatedRoute.snapshot.params['id'];

    const currentUrl = this.activatedRoute.snapshot.url.join('/');

    if (currentUrl.includes('filterByCustomer')) {
      this.filterByCustomer();
    } else if (currentUrl.includes('filterByBatch')) {
      this.filterByBatch();
    } else {
      this.list();
    }
  }

  list() {
    this.productService.list().subscribe((data) => {
      this.products = data;
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
        this.productService.delete(id).subscribe((data) => {
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
    this.router.navigate(['producto/create']);
  }

  view(id: number) {
    this.router.navigate(['producto/view', id]);
  }

  update(id: number) {
    this.router.navigate(['producto/update', id]);
  }

  filterByCustomer(){
    this.productService.listByCustomer(this.customer_id).subscribe(data=>{
      this.products = data;
      console.log(this.products);
    })
  }

  filterByBatch(){
    this.productService.listByBatch(this.batch_id).subscribe(data=>{
      this.products = data;
      console.log(this.products);
      
    })
  }

  showCategoryProducts(id:number){
    this.router.navigate(["categoria-producto/filterByProduct", id])
  }
}