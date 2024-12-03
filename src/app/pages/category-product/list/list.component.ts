import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private categoryProductService: CategoryProductService, private router: Router) {
    console.log('Constructor');
    this.categoryProducts = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.categoryProductService.list().subscribe((data) => {
      this.categoryProducts = data;
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
    this.router.navigate(['category-products/create']);
  }

  view(id: number) {
    this.router.navigate(['category-products/view', id]);
  }

  update(id: number) {
    this.router.navigate(['category-products/update', id]);
  }
}