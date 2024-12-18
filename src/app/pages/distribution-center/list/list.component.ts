import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DistributionCenter } from 'src/app/models/distribution-center.model';
import { DistributionCenterService } from 'src/app/services/distribution-center.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  distributionCenters: DistributionCenter[];
  municipality_id: number;

  constructor(private distributionCenterService: DistributionCenterService, private router: Router, private activatedRoute: ActivatedRoute) {
    console.log('Constructor');
    this.distributionCenters = [];
  }
  
  ngOnInit(): void {
    this.municipality_id= this.activatedRoute.snapshot.params['id'];
    const currentUrl = this.activatedRoute.snapshot.url.join('/');

    if(currentUrl.includes('filterByMunicipality')){
      this.filterByMunicipality();
    }else{
      this.list() //lista por defecto 
    }
  }

  list() {
    this.distributionCenterService.list().subscribe((data) => {
      this.distributionCenters = data;
      console.log(this.distributionCenters);
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
        this.distributionCenterService.delete(id).subscribe((data) => {
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
    this.router.navigate(['centro-distribucion/create']);
  }

  view(id: number) {
    this.router.navigate(['centro-distribucion/view', id]);
  }

  update(id: number) {
    this.router.navigate(['centro-distribucion/update', id]);
  }

  filterByMunicipality(){
    this.distributionCenterService.listByMunicipality(this.municipality_id).subscribe(data =>{
      this.distributionCenters = data;
      console.log(this.distributionCenters);
      
    })
  }
}