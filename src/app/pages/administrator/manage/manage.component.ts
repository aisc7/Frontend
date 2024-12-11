import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdministratorService } from './../../../services/administrator.service';
import { Administrator } from 'src/app/models/administrator.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageAdministratorComponent implements OnInit {
  administratorForm: FormGroup;
  administratorId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private administratorService: AdministratorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    } else if (currentUrl.includes("delete")) {
      this.mode = 4;
    }
  
    if (this.route.snapshot.params.id) {
      this.administratorId = this.route.snapshot.params.id;
      this.getAdministrator(this.administratorId);
    }
  }

  configFormGroup() {
    this.administratorForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.administratorForm.controls;
  }

  getAdministrator(id: number) {
    this.administratorService.get(id).subscribe((data) => {
      this.administratorForm.patchValue(data);
    });
  }

  create() {
    this.trySend = true;
    if (this.administratorForm.valid) {
      this.administratorService.create(this.administratorForm.value).subscribe(() => {
        Swal.fire('Creado', 'El administrador ha sido creado correctamente', 'success');
        this.router.navigate(['/administrators']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.administratorForm.valid) {
      this.administratorService.update(this.administratorId, this.administratorForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El administrador ha sido actualizado correctamente', 'success');
        this.router.navigate(['/administrators']);
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
        this.administratorService.delete(id).subscribe(data => {
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