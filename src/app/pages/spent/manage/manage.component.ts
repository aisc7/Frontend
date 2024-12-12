import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SpentService } from './../../../services/spent.service';
import { Spent } from 'src/app/models/spent.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageSpentComponent implements OnInit {
  spentForm: FormGroup;
  spentId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private spentService: SpentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1; // Modo de ver
    } else if (currentUrl.includes("create")) {
      this.mode = 2; // Modo de crear
    } else if (currentUrl.includes("update")) {
      this.mode = 3; // Modo de actualizar
    } else if (currentUrl.includes("delete")) {
      this.mode = 4; // Modo de eliminar
    }
    if (this.spentId) {
      this.spentService.get(this.spentId).subscribe((data: Spent) => {
        this.spentForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.spentForm = this.theFormBuilder.group({
      description: ['', Validators.required],
      monto: ['', Validators.required],
      date: ['', Validators.required],
      servicio_id: ['', Validators.required],
      conductor_id: ['', Validators.required],
      dueno_id: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.spentForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.spentForm.valid) {
      this.spentService.create(this.spentForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Gasto ha sido creado correctamente', 'success');
        this.router.navigate(['/spents']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.spentForm.valid) {
      this.spentService.update(this.spentId, this.spentForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Gasto ha sido actualizado correctamente', 'success');
        this.router.navigate(['/spents']);
      });
    }
  }
}