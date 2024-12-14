import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SpentService } from './../../../services/spent.service';
import { Spent } from 'src/app/models/spent.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-spent',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageSpentComponent implements OnInit {
  spentForm: FormGroup;
  spentId: number | undefined;
  mode: number = 0; // 1: Ver, 2: Crear, 3: Actualizar
  trySend: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private spentService: SpentService,
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
    }

    this.spentId = this.route.snapshot.params['id'];
    if (this.spentId && this.mode !== 2) {
      this.getSpent(this.spentId);
    }
  }

  configFormGroup() {
    this.spentForm = this.formBuilder.group({
      description: ['', Validators.required],
      monto: ['', Validators.required],
      date: ['', Validators.required],
      servicio_id: ['', Validators.required],
      conductor_id: ['', Validators.required],
      dueno_id: ['', Validators.required],
    });
  }

  get formControls() {
    return this.spentForm.controls;
  }

  getSpent(id: number) {
    this.spentService.get(id).subscribe((data: Spent) => {
      this.spentForm.patchValue(data);
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
    if (this.spentForm.valid) {
      this.spentService.create(this.spentForm.value).subscribe(
        () => {
          Swal.fire('Creado', 'El gasto ha sido creado correctamente.', 'success');
          this.router.navigate(['/spents']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al crear el gasto.', 'error');
        }
      );
    }
  }

  update() {
    this.trySend = true;
    if (this.spentForm.valid) {
      this.spentService.update(this.spentId!, this.spentForm.value).subscribe(
        () => {
          Swal.fire('Actualizado', 'El gasto ha sido actualizado correctamente.', 'success');
          this.router.navigate(['/spents']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al actualizar el gasto.', 'error');
        }
      );
    }
  }
}