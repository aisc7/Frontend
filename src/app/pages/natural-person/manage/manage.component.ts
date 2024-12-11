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
  mode: number;
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
      this.naturalPersonId = this.route.snapshot.params.id;
      this.getNaturalPerson(this.naturalPersonId);
    }
  }

  configFormGroup() {
    this.naturalPersonForm = this.theFormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required]
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
  delete () {
    this.naturalPersonService.delete(this.naturalPersonId).subscribe(() => {
      Swal.fire('Eliminado', 'La Persona Natural ha sido eliminada correctamente', 'success');
      this.router.navigate(['/natural-persons']);
    });
  }
}