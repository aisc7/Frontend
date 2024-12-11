import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NaturalPersonService } from './../../../services/natural-person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageNaturalPersonComponent implements OnInit {
  naturalPersonForm: FormGroup;
  naturalPersonId: number;
  mode: number; // Modo de operación: 1- Visualizar, 2- Crear, 3- Actualizar
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private naturalPersonService: NaturalPersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");

    switch (true) {
      case currentUrl.includes("view"):
        this.mode = 1;
        break;
      case currentUrl.includes("create"):
        this.mode = 2;
        break;
      case currentUrl.includes("update"):
        this.mode = 3;
        break;
      case currentUrl.includes("delete"):
        this.mode = 4;
        break;
      default:
        this.mode = 2; // Si no se encuentra ningún modo en la URL, asumimos que es Crear
        break;
    }

    if (this.route.snapshot.params.id) {
      this.naturalPersonId = this.route.snapshot.params.id;
      this.getNaturalPerson(this.naturalPersonId);
    }
  }

  configFormGroup() {
    this.naturalPersonForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
    });
  }

  get getTheFormGroup() {
    return this.naturalPersonForm.controls;
  }

  getNaturalPerson(id: number) {
    this.naturalPersonService.get(id).subscribe((data) => {
      this.naturalPersonForm.patchValue(data);
    });
  }

  create() {
    this.trySend = true;
    if (this.naturalPersonForm.valid) {
      this.naturalPersonService.create(this.naturalPersonForm.value).subscribe(() => {
        Swal.fire('Creado', 'La Persona Natural ha sido creada correctamente', 'success');
        this.router.navigate(['/natural-persons']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.naturalPersonForm.valid) {
      this.naturalPersonService.update(this.naturalPersonId, this.naturalPersonForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La Persona Natural ha sido actualizada correctamente', 'success');
        this.router.navigate(['/natural-persons']);
      });
    }
  }

  delete() {
    this.naturalPersonService.delete(this.naturalPersonId).subscribe(() => {
      Swal.fire('Eliminado', 'La Persona Natural ha sido eliminada correctamente', 'success');
      this.router.navigate(['/natural-persons']);
    });
  }
}
