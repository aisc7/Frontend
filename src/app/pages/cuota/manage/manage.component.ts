import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CuotaService } from './../../../services/cuota.service';
import { Cuota } from 'src/app/models/cuota.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  cuotaForm: FormGroup;
  cuotaId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private cuotaService: CuotaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.cuotaId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.cuotaId) {
      this.cuotaService.get(this.cuotaId).subscribe((data: Cuota) => {
        this.cuotaForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.cuotaForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  get getTheFormGroup() {
    return this.cuotaForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.cuotaForm.valid) {
      this.cuotaService.create(this.cuotaForm.value).subscribe(() => {
        Swal.fire('Creado', 'La Cuota ha sido creada correctamente', 'success');
        this.router.navigate(['/cuotas']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.cuotaForm.valid) {
      this.cuotaService.update(this.cuotaId, this.cuotaForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La Cuota ha sido actualizada correctamente', 'success');
        this.router.navigate(['/cuotas']);
      });
    }
  }
}