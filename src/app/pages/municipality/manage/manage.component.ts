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

export class ManageMunicipalityComponent implements OnInit {
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
      this.municipalityId = this.route.snapshot.params.id;
      this.getMunicipality(this.municipalityId);
    }
  }

  configFormGroup() {
    this.municipalityForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      department_id: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.municipalityForm.controls;
  }

  getMunicipality(id: number) {
    this.municipalityService.get(id).subscribe((data) => {
      this.municipalityForm.patchValue(data);
    });
  }

  create() {
    this.trySend = true;
    if (this.municipalityForm.valid) {
      this.municipalityService.create(this.municipalityForm.value).subscribe(() => {
        Swal.fire('Creado', 'El municipio ha sido creado correctamente', 'success');
        this.router.navigate(['/municipalities']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.municipalityForm.valid) {
      this.municipalityService.update(this.municipalityId, this.municipalityForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El municipio ha sido actualizado correctamente', 'success');
        this.router.navigate(['/municipalities']);
      });
    }
  }
  delete () {
    this.municipalityService.delete(this.municipalityId).subscribe(() => {
      Swal.fire('Eliminado', 'El municipio ha sido eliminado correctamente', 'success');
      this.router.navigate(['/municipalities']);
    });
  }
}