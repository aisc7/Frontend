import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ShiftService } from './../../../services/shift.service';
import { Shift } from 'src/app/models/shift.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})

export class ManageShiftComponent implements OnInit {
  shiftForm: FormGroup;
  shiftId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private shiftService: ShiftService,
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
    if (this.shiftId) {
      this.shiftService.get(this.shiftId).subscribe((data: Shift) => {
        this.shiftForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.shiftForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.shiftForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.shiftForm.valid) {
      this.shiftService.create(this.shiftForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Turno ha sido creado correctamente', 'success');
        this.router.navigate(['/shifts']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.shiftForm.valid) {
      this.shiftService.update(this.shiftId, this.shiftForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Turno ha sido actualizado correctamente', 'success');
        this.router.navigate(['/shifts']);
      });
    }
  }
}