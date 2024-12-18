import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cuota } from 'src/app/models/cuota.model';
import { CuotaService } from 'src/app/services/cuota.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  cuotas: Cuota[];
  contract_id: number;

  constructor(private cuotaService: CuotaService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('Constructor');
    this.cuotas = [];
  }

  ngOnInit(): void {
    this.contract_id= this.activatedRoute.snapshot.params['id'];

    const currentUrl = this.activatedRoute.snapshot.url.join('/');
    if(currentUrl.includes('filterByContract')){
      this.filterByContract();
    }else{
      this.list()
    }
  }

  list() {
    this.cuotaService.list().subscribe((data) => {
      this.cuotas = data;
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
        this.cuotaService.delete(id).subscribe((data) => {
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
    this.router.navigate(['cuota/create']);
  }

  view(id: number) {
    this.router.navigate(['cuota/view', id]);
  }

  update(id: number) {
    this.router.navigate(['cuota/update', id]);
  }

  filterByContract(){
    this.cuotaService.listByContract(this.contract_id).subscribe(data=>{
      this.cuotas = data;
      console.log(this.cuotas);
      
    }
    )
  }
}