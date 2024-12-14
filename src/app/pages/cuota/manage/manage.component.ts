import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CuotaService } from './../../../services/cuota.service';
import { Cuota } from 'src/app/models/cuota.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-cuota',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageCuotaComponent implements OnInit {
  cuotaForm: FormGroup;
  cuotaId: number | undefined;
  mode: number = 0; // 1: View, 2: Create, 3: Update, 4: Delete
  trySend: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private cuotaService: CuotaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    } else if (currentUrl.includes('delete')) {
      this.mode = 4;
    }

    this.cuotaId = this.route.snapshot.params['id'];
    if (this.cuotaId && this.mode !== 2) {
      this.getCuota(this.cuotaId);
    }
  }

  configFormGroup() {
    this.cuotaForm = this.formBuilder.group({
      monto: ['', Validators.required],
      fecha_vencimiento: ['', Validators.required],
      estado_pago: ['', Validators.required],
      contract_id: ['', Validators.required],
    });
  }

  get formControls() {
    return this.cuotaForm.controls;
  }

  getCuota(id: number) {
    this.cuotaService.get(id).subscribe((data: Cuota) => {
      this.cuotaForm.patchValue(data);
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
    if (this.cuotaForm.valid) {
      this.cuotaService.create(this.cuotaForm.value).subscribe(
        () => {
          Swal.fire('Creado', 'La cuota ha sido creada correctamente.', 'success');
          this.router.navigate(['/cuotas']);
        },
        (error) => {
          console.error('Error al crear la cuota:', error);
          Swal.fire('Error', 'Ocurrió un error al crear la cuota.', 'error');
        }
      );
    }
  }

  update() {
    this.trySend = true;
    if (this.cuotaForm.valid) {
      this.cuotaService.update(this.cuotaId!, this.cuotaForm.value).subscribe(
        () => {
          Swal.fire('Actualizado', 'La cuota ha sido actualizada correctamente.', 'success');
          this.router.navigate(['/cuotas']);
        },
        (error) => {
          console.error('Error al actualizar la cuota:', error);
          Swal.fire('Error', 'Ocurrió un error al actualizar la cuota.', 'error');
        }
      );
    }
  }
}