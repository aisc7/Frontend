import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DuenoService } from './../../../services/dueno.service';
import { Dueno } from 'src/app/models/dueno.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage-dueno',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageDuenoComponent implements OnInit {
  duenoForm: FormGroup;
  duenoId: number | undefined;
  mode: number = 0; // 1: Ver, 2: Crear, 3: Actualizar
  trySend: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private duenoService: DuenoService,
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

    this.duenoId = this.route.snapshot.params['id'];
    if (this.duenoId && this.mode !== 2) {
      this.getDueno(this.duenoId);
    }
  }

  configFormGroup() {
    this.duenoForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      conductor_id: ['', Validators.required]
    });
  }

  get formControls() {
    return this.duenoForm.controls;
  }

  getDueno(id: number) {
    this.duenoService.get(id).subscribe((data: Dueno) => {
      this.duenoForm.patchValue(data);
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
    if (this.duenoForm.valid) {
      this.duenoService.create(this.duenoForm.value).subscribe(
        () => {
          Swal.fire('Creado', 'El dueño ha sido creado correctamente.', 'success');
          this.router.navigate(['/duenos']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al crear el dueño.', 'error');
        }
      );
    }
  }

  update() {
    this.trySend = true;
    if (this.duenoForm.valid) {
      this.duenoService.update(this.duenoId!, this.duenoForm.value).subscribe(
        () => {
          Swal.fire('Actualizado', 'El dueño ha sido actualizado correctamente.', 'success');
          this.router.navigate(['/duenos']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al actualizar el dueño.', 'error');
        }
      );
    }
  }
}