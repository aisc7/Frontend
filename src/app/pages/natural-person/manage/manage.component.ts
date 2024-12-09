import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NaturalPersonService } from './../../../services/natural-person.service';
import { NaturalPerson } from 'src/app/models/natural-person.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  naturalPersonForm: FormGroup;
  naturalPersonId: number;
  naturalPerson: NaturalPerson
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private naturalPersonService: NaturalPersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
    this.trySend = false
    this.naturalPerson= new NaturalPerson
  }

  ngOnInit(): void {
    this.naturalPersonId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.naturalPersonId) {
      this.naturalPersonService.get(this.naturalPersonId).subscribe((data: NaturalPerson) => {
        this.naturalPersonForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.naturalPersonForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      document: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.naturalPersonForm.controls;
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
}