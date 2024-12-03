import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { OperationService } from './../../../services/operation.service';
import { Operation } from 'src/app/models/operation.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  operationForm: FormGroup;
  operationId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private operationService: OperationService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.operationId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.operationId) {
      this.operationService.get(this.operationId).subscribe((data: Operation) => {
        this.operationForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.operationForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.operationForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.operationForm.valid) {
      this.operationService.create(this.operationForm.value).subscribe(() => {
        Swal.fire('Creado', 'La Operación ha sido creada correctamente', 'success');
        this.router.navigate(['/operations']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.operationForm.valid) {
      this.operationService.update(this.operationId, this.operationForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La Operación ha sido actualizada correctamente', 'success');
        this.router.navigate(['/operations']);
      });
    }
  }
}