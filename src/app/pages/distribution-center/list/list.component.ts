import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private distributionCenterService: DistributionCenterService, private router: Router) {
    console.log('Constructor');
    this.distributionCenters = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.distributionCenterService.list().subscribe((data) => {
      this.distributionCenters = data;
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
    this.router.navigate(['distribution-centers/create']);
  }

  view(id: number) {
    this.router.navigate(['distribution-centers/view', id]);
  }

  update(id: number) {
    this.router.navigate(['distribution-centers/update', id]);
  }
}