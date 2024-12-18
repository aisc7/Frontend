import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Factura } from 'src/app/models/factura.model';
import { FacturaService } from 'src/app/services/factura.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  facturas: Factura[];

  constructor(private facturaService: FacturaService, private router: Router) {
    console.log('Constructor');
    this.facturas = [];
  }

  ngOnInit(): void {
    console.log('Ng');
    this.list();
  }

  list() {
    this.facturaService.list().subscribe((data: any[]) => {
      this.facturas= data.map(item => ({
      id: item.id,
      fecha_emision: item.fecha_emision,
      monto_total: item.monto_total,
      estado: item.estado,
      cuota_id: item.cuota_id,
      spent_id: item.spent_id,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
      cuota: item.cuota,
      spent: item.spent
      
      }));
      console.log('empresa:', this.facturas);
    }
  );
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
        this.facturaService.delete(id).subscribe((data) => {
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
    this.router.navigate(['factura/create']);
  }

  view(id: number) {
    this.router.navigate(['factura/view', id]);
  }

  update(id: number) {
    this.router.navigate(['factura/update', id]);
  }

  payment(id:number){
    this.router.navigate(['factura/payment', id])
  }
}