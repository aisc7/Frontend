import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Spent } from 'src/app/models/spent.model';
import { SpentService } from 'src/app/services/spent.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  spents: Spent[];
  dueno_id: number;
  conductor_id: number;
  service_id: number;

  constructor(private spentService: SpentService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('Constructor');
    this.spents = [];
  }

  ngOnInit(): void {
    this.dueno_id = this.activatedRoute.snapshot.params['id'];
    this.conductor_id = this.activatedRoute.snapshot.params['id'];
    this.service_id = this.activatedRoute.snapshot.params['id'];

    const currentUrl = this.activatedRoute.snapshot.url.join('/');

    if(currentUrl.includes('filterByDueno')){
      this.filterByDueno();
    }else if(currentUrl.includes('filterByConductor')){
      this.filterByConductor();
    }else if(currentUrl.includes('filterByService')){
      this.filterByService();
    }else{
      this.list() //lista por defecto 
    }
  }

  list() {
    this.spentService.list().subscribe((data) => {
      this.spents = data;
      console.log(this.spents);
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
        this.spentService.delete(id).subscribe((data) => {
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
    this.router.navigate(['gasto/create']);
  }

  view(id: number) {
    this.router.navigate(['gasto/view', id]);
  }

  update(id: number) {
    this.router.navigate(['gasto/update', id]);
  }


  filterByDueno(){
    this.spentService.listByDueno(this.dueno_id).subscribe(data=>{
      this.spents=data;
      console.log(this.spents)
    })
  }

  filterByConductor(){
    this.spentService.listByConductor(this.conductor_id).subscribe(data=>{
      this.spents=data;
      console.log(this.spents)
    })
  }

  filterByService(){
    this.spentService.listByService(this.service_id).subscribe(data=>{
      this.spents=data;
      console.log(this.spents)
    })
  }
}