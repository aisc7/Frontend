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
export class ManageCuotaComponent implements OnInit {
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
    const currentUrl = this.route.snapshot.url.join("/");
    this.mode = currentUrl.includes("view") ? 1 : currentUrl.includes("create") ? 2 : currentUrl.includes("update") ? 3 : 4;
    
    if (this.route.snapshot.params.id) {
      this.cuotaId = this.route.snapshot.params.id;
      this.getCuota(this.cuotaId);
    }
  }

  configFormGroup() {
    this.cuotaForm = this.theFormBuilder.group({
      amount: ['', Validators.required],
      paymentDate: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.cuotaForm.controls;
  }

  getCuota(id: number) {
    this.cuotaService.get(id).subscribe((data) => {
      this.cuotaForm.patchValue(data);
    });
  }

  handleAction() {
    this.trySend = true;
    if (this.cuotaForm.valid) {
      switch (this.mode) {
        case 2:
          this.create();
          break;
        case 3:
          this.update();
          break;
        case 4:
          this.delete();
          break;
        default:
          break;
      }
    }
  }

  create() {
    this.cuotaService.create(this.cuotaForm.value).subscribe(() => {
      Swal.fire('Creado', 'La cuota ha sido creada correctamente', 'success');
      this.router.navigate(['/cuotas']);
    });
  }

  update() {
    this.cuotaService.update(this.cuotaId, this.cuotaForm.value).subscribe(() => {
      Swal.fire('Actualizado', 'La cuota ha sido actualizada correctamente', 'success');
      this.router.navigate(['/cuotas']);
    });
  }

  delete() {
    this.cuotaService.delete(this.cuotaId).subscribe(() => {
      Swal.fire('Eliminado', 'La cuota ha sido eliminada correctamente', 'success');
      this.router.navigate(['/cuotas']);
    });
  }
}
