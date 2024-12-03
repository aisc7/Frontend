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
    this.conductorId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.conductorId) {
      this.conductorService.get(this.conductorId).subscribe((data: Conductor) => {
        this.conductorForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.conductorForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      license: ['', Validators.required]
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
}