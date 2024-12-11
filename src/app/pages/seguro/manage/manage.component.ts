import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SeguroService } from './../../../services/seguro.service';
import { Seguro } from 'src/app/models/seguro.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageSeguroComponent implements OnInit {
  seguroForm: FormGroup;
  seguroId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private seguroService: SeguroService,
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

    if (this.seguroId) {
      this.seguroService.get(this.seguroId).subscribe((data: Seguro) => {
        this.seguroForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.seguroForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      policyNumber: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.seguroForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.seguroForm.valid) {
      this.seguroService.create(this.seguroForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Seguro ha sido creado correctamente', 'success');
        this.router.navigate(['/seguros']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.seguroForm.valid) {
      this.seguroService.update(this.seguroId, this.seguroForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Seguro ha sido actualizado correctamente', 'success');
        this.router.navigate(['/seguros']);
      });
    }
  }

  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este seguro será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.seguroService.delete(this.seguroId).subscribe(() => {
          Swal.fire('Eliminado', 'El seguro ha sido eliminado', 'success');
          this.router.navigate(['/seguros']);
        });
      }
    });
  }
}
