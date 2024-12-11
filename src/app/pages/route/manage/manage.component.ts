import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RouteService } from './../../../services/route.service';
import { Route } from 'src/app/models/route.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageRouteComponent implements OnInit {
  routeForm: FormGroup;
  routeId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private routeService: RouteService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.routeId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.routeId) {
      this.routeService.get(this.routeId).subscribe((data: Route) => {
        this.routeForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.routeForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.routeForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.routeForm.valid) {
      this.routeService.create(this.routeForm.value).subscribe(() => {
        Swal.fire('Creado', 'La Ruta ha sido creada correctamente', 'success');
        this.router.navigate(['/routes']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.routeForm.valid) {
      this.routeService.update(this.routeId, this.routeForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La Ruta ha sido actualizada correctamente', 'success');
        this.router.navigate(['/routes']);
      });
    }
  }
}