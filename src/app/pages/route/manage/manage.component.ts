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
      const currentUrl = this.route.snapshot.url.join("/");
      if (currentUrl.includes("view")) {
        this.mode = 1; // Modo de ver
      } else if (currentUrl.includes("create")) {
        this.mode = 2; // Modo de crear
      } else if (currentUrl.includes("update")) {
        this.mode = 3; // Modo de actualizar
      } else if (currentUrl.includes("delete")) {
        this.mode = 4; // Modo de eliminar
      }
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