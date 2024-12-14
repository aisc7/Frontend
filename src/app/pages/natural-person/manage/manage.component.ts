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
  personId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private naturalPersonService: NaturalPersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1; // Ver
    } else if (currentUrl.includes('create')) {
      this.mode = 2; // Crear
    } else if (currentUrl.includes('update')) {
      this.mode = 3; // Actualizar
    }

    if (this.route.snapshot.params.id) {
      this.personId = this.route.snapshot.params.id;
      this.getNaturalPerson(this.personId);
    }
  }

  configFormGroup() {
    this.naturalPersonForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      birth_date: ['', Validators.required],
      company_id: [''],
      customer_id: ['', Validators.required]
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

  handleAction() {
    if (this.mode === 2) {
      this.create();
    } else if (this.mode === 3) {
      this.update();
    }
  }

  create() {
    this.trySend = true;
    if (this.naturalPersonForm.valid) {
      this.naturalPersonService.create(this.naturalPersonForm.value).subscribe(() => {
        Swal.fire('Creado', 'La persona natural ha sido creada correctamente', 'success');
        this.router.navigate(['/natural-people']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.naturalPersonForm.valid) {
      this.naturalPersonService.update(this.personId, this.naturalPersonForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La persona natural ha sido actualizada correctamente', 'success');
        this.router.navigate(['/natural-people']);
      });
    }
  }
}