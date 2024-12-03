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
export class ManageComponent implements OnInit {
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
    this.spentId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.spentId) {
      this.spentService.get(this.spentId).subscribe((data: Spent) => {
        this.spentForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.spentForm = this.theFormBuilder.group({
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]]
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