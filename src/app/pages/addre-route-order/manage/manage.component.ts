import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddreRouteOrderService } from './../../../services/addre-route-order.service';
import { AddreRouteOrder } from 'src/app/models/addre-route-order.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  addreRouteOrderForm: FormGroup;
  addreRouteOrderId: number;
  mode: number;
  trySend: boolean = false;
  orderId: any;

  constructor(
    private theFormBuilder: FormBuilder,
    private addreRouteOrderService: AddreRouteOrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    } else if (currentUrl.includes('delete')) {
      this.mode = 4;
    }

    if (this.route.snapshot.params.id) {
      this.addreRouteOrderId = this.route.snapshot.params.id;
      this.getAddreRouteOrder(this.addreRouteOrderId);
    }
  }

  configFormGroup() {
    this.addreRouteOrderForm = this.theFormBuilder.group({
      address_id: ['', Validators.required], // ID de la dirección, requerido
      route_id: ['', Validators.required], // ID de la ruta, requerido
    });
  }

  get getTheFormGroup() {
    return this.addreRouteOrderForm.controls;
  }

  getAddreRouteOrder(id: number) {
    this.addreRouteOrderService.get(id).subscribe((data) => {
      this.addreRouteOrderForm.patchValue(data);
    });
  }

  handleAction() {
    this.trySend = true;
    if (this.addreRouteOrderForm.valid) {
      if (this.mode === 2) {
        this.create();
      } else if (this.mode === 3) {
        this.update();
      }
    }
  }

  create() {
    this.trySend = true;
    if (this.addreRouteOrderForm.valid) {
      this.addreRouteOrderService.create(this.addreRouteOrderForm.value).subscribe(
        () => {
          Swal.fire('Creado', 'El AddreRouteOrder ha sido creado correctamente', 'success');
          this.router.navigate(['/addre-route-orders']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al crear el AddreRouteOrder', 'error');
        }
      );
    }
  }

  update() {
    this.trySend = true;
    if (this.addreRouteOrderForm.valid) {
      this.addreRouteOrderService.update(this.addreRouteOrderId, this.addreRouteOrderForm.value).subscribe(
        () => {
          Swal.fire('Actualizado', 'El AddreRouteOrder ha sido actualizado correctamente', 'success');
          this.router.navigate(['/addre-route-orders']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al actualizar el AddreRouteOrder', 'error');
        }
      );
    }
  }
}