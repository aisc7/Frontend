import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { AddressService } from 'src/app/services/address.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  addresses: Address[];
  municipality_id: number;

  constructor(private addressService: AddressService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('Constructor');
    this.addresses = [];
  }

  ngOnInit(): void {
    this.municipality_id = this.activatedRoute.snapshot.params['id'];
    const currentUrl = this.activatedRoute.snapshot.url.join('/');

    if(currentUrl.includes('filterByMunicipality')){
      this.filterByMunicipality();
    }else{
      this.list()
    }
  }

  list() {
    this.addressService.list().subscribe((data) => {
      this.addresses = data;
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
        this.addressService.delete(id).subscribe((data) => {
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
    this.router.navigate(['direccion/create']);
  }

  view(id: number) {
    this.router.navigate(['direccion/view', id]);
  }

  update(id: number) {
    this.router.navigate(['direccion/update', id]);
  }

  filterByMunicipality(){
    this.addressService.listByMunicipality(this.municipality_id).subscribe(data=>{
      this.addresses = data;
      console.log(this.addresses);
      
    })
  }

  showAddreRouteOrders(id:number){
    this.router.navigate(["orden-ruta-direccion/filterByAddress",id])
  }
}