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
export class ManageComponent implements OnInit {
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
    this.administratorId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.administratorId) {
      this.administratorService.get(this.administratorId).subscribe((data: Administrator) => {
        this.administratorForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.administratorForm = this.theFormBuilder.group({
      userId: ['', Validators.required],
      servicioId: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.administratorForm.controls;
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
}