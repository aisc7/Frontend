import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contract } from 'src/app/models/contract.model';
import { ContractService } from 'src/app/services/contract.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  contracts: Contract[];
  customer_id: number;

  constructor(private contractService: ContractService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('Constructor');
    this.contracts = [];
  }

  ngOnInit(): void {
    this.customer_id = this.activatedRoute.snapshot.params['id'];
    const currentUrl= this.activatedRoute.snapshot.url.join('/');

    if(currentUrl.includes('filterByCustomer')){
      this.filterByCustomer();
    }else{
      this.list();
    }
  }

  list() {
    this.contractService.list().subscribe((data) => {
      this.contracts = data;
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
        this.contractService.delete(id).subscribe((data) => {
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
    this.router.navigate(['contracto/create']);
  }

  view(id: number) {
    this.router.navigate(['contracto/view', id]);
  }

  update(id: number) {
    this.router.navigate(['contracto/update', id]);
  }

  filterByCustomer(){
    this.contractService.listByCustomer(this.customer_id).subscribe(data =>{
      this.contracts =data;
      console.log(this.contracts);
      
    })
  }

  showCuotas(id: number){
    this.router.navigate(["cuotas/filterByContract", id])
  }


  showRoutes(id:number){
    this.router.navigate(["rutas/filterByContract", id])

  }
}