import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SeguroService } from './../../../services/seguro.service';
import { Seguro } from 'src/app/models/seguro.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  seguroForm: FormGroup;
  seguroId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private seguroService: SeguroService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.seguroId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.seguroId) {
      this.seguroService.get(this.seguroId).subscribe((data: Seguro) => {
        this.seguroForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.seguroForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.seguroForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.seguroForm.valid) {
      this.seguroService.create(this.seguroForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Seguro ha sido creado correctamente', 'success');
        this.router.navigate(['/seguros']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.seguroForm.valid) {
      this.seguroService.update(this.seguroId, this.seguroForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Seguro ha sido actualizado correctamente', 'success');
        this.router.navigate(['/seguros']);
      });
    }
  }
}