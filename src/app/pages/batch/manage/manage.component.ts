import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BatchService } from './../../../services/batch.service';
import { Batch } from 'src/app/models/batch.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  batchForm: FormGroup;
  batchId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private batchService: BatchService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.batchId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.batchId) {
      this.batchService.get(this.batchId).subscribe((data: Batch) => {
        this.batchForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.batchForm = this.theFormBuilder.group({
      addressId: ['', Validators.required],
      routeId: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.batchForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.batchForm.valid) {
      this.batchService.create(this.batchForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Batch ha sido creado correctamente', 'success');
        this.router.navigate(['/batches']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.batchForm.valid) {
      this.batchService.update(this.batchId, this.batchForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Batch ha sido actualizado correctamente', 'success');
        this.router.navigate(['/batches']);
      });
    }
  }
}
