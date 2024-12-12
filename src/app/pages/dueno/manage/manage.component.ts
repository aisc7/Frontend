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
export class ManageDuenoComponent implements OnInit {
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
      this.duenoId = this.route.snapshot.params.id;
      this.getDueno(this.duenoId);
    }
  }

  configFormGroup() {
    this.duenoForm = this.theFormBuilder.group({
      user_id: ['', Validators.required],
      conductor_id: ['', Validators.required],

    });
  }

  get getTheFormGroup() {
    return this.duenoForm.controls;
  }

  getDueno(id: number) {
    this.duenoService.get(id).subscribe((data) => {
      this.duenoForm.patchValue(data);
    });
  }

  create() {
    this.trySend = true;
    if (this.duenoForm.valid) {
      this.duenoService.create(this.duenoForm.value).subscribe(() => {
        Swal.fire('Creado', 'El dueño ha sido creado correctamente', 'success');
        this.router.navigate(['/duenos']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.duenoForm.valid) {
      this.duenoService.update(this.duenoId, this.duenoForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El dueño ha sido actualizado correctamente', 'success');
        this.router.navigate(['/duenos']);
      });
    }
  }
  delete () { 
    this.duenoService.delete(this.duenoId).subscribe(() => {
      Swal.fire('Eliminado', 'El dueño ha sido eliminado correctamente', 'success');
      this.router.navigate(['/duenos']);
    });
  }
}