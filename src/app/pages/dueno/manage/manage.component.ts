import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DuenoService } from './../../../services/dueno.service';
import { Dueno } from 'src/app/models/dueno.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  duenoForm: FormGroup;
  duenoId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private duenoService: DuenoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.duenoId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.duenoId) {
      this.duenoService.get(this.duenoId).subscribe((data: Dueno) => {
        this.duenoForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.duenoForm = this.theFormBuilder.group({
      name: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.duenoForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.duenoForm.valid) {
      this.duenoService.create(this.duenoForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Dueño ha sido creado correctamente', 'success');
        this.router.navigate(['/duenos']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.duenoForm.valid) {
      this.duenoService.update(this.duenoId, this.duenoForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Dueño ha sido actualizado correctamente', 'success');
        this.router.navigate(['/duenos']);
      });
    }
  }
}