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

  constructor(
    private theFormBuilder: FormBuilder,
    private addreRouteOrderService: AddreRouteOrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.addreRouteOrderId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.addreRouteOrderId) {
      this.addreRouteOrderService.get(this.addreRouteOrderId).subscribe((data: AddreRouteOrder) => {
        this.addreRouteOrderForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.addreRouteOrderForm = this.theFormBuilder.group({
      addressId: ['', Validators.required],
      routeId: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.addreRouteOrderForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.addreRouteOrderForm.valid) {
      this.addreRouteOrderService.create(this.addreRouteOrderForm.value).subscribe(() => {
        Swal.fire('Creado', 'El AddreRouteOrder ha sido creado correctamente', 'success');
        this.router.navigate(['/addre-route-orders']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.addreRouteOrderForm.valid) {
      this.addreRouteOrderService.update(this.addreRouteOrderId, this.addreRouteOrderForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El AddreRouteOrder ha sido actualizado correctamente', 'success');
        this.router.navigate(['/addre-route-orders']);
      });
    }
  }
}