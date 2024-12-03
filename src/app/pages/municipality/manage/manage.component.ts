import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MunicipalityService } from './../../../services/municipality.service';
import { Municipality } from 'src/app/models/municipality.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  municipalityForm: FormGroup;
  municipalityId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private municipalityService: MunicipalityService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.municipalityId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.municipalityId) {
      this.municipalityService.get(this.municipalityId).subscribe((data: Municipality) => {
        this.municipalityForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.municipalityForm = this.theFormBuilder.group({
      name: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.municipalityForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.municipalityForm.valid) {
      this.municipalityService.create(this.municipalityForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Municipio ha sido creado correctamente', 'success');
        this.router.navigate(['/municipalities']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.municipalityForm.valid) {
      this.municipalityService.update(this.municipalityId, this.municipalityForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Municipio ha sido actualizado correctamente', 'success');
        this.router.navigate(['/municipalities']);
      });
    }
  }
}