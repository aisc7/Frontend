import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConductorService } from './../../../services/conductor.service';
import { Conductor } from 'src/app/models/conductor.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  conductorForm: FormGroup;
  conductorId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private conductorService: ConductorService,
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

    // Recuperar conductor si existe un ID en el URL
    this.route.params.subscribe(params => {
      this.conductorId = +params['id']; // Obtener ID del URL
      if (this.conductorId) {
        this.conductorService.get(this.conductorId).subscribe((data: Conductor) => {
          this.conductorForm.patchValue(data);
        });
      }
    });
  }

  configFormGroup() {
    this.conductorForm = this.theFormBuilder.group({
      user_id: ['', Validators.required],
      licencia: ['', Validators.required],
      tipo_licencia: ['', Validators.required],
      telefono: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.conductorForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.conductorForm.valid) {
      this.conductorService.create(this.conductorForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Conductor ha sido creado correctamente', 'success');
        this.router.navigate(['/conductors']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.conductorForm.valid) {
      this.conductorService.update(this.conductorId, this.conductorForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Conductor ha sido actualizado correctamente', 'success');
        this.router.navigate(['/conductors']);
      });
    }
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminación",
      text: "Está seguro que quiere eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No,cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.conductorService.delete(id).subscribe(data => {
          Swal.fire({
            title: "Eliminado",
            text: "Se ha eliminado correctamente",
            icon: "success"
          });
        })

      }
    });
  }
}
