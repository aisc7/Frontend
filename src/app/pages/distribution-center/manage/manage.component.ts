import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DistributionCenterService } from './../../../services/distribution-center.service';
import { DistributionCenter } from 'src/app/models/distribution-center.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  distributionCenterForm: FormGroup;
  distributionCenterId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private distributionCenterService: DistributionCenterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.distributionCenterId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.distributionCenterId) {
      this.distributionCenterService.get(this.distributionCenterId).subscribe((data: DistributionCenter) => {
        this.distributionCenterForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.distributionCenterForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.distributionCenterForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.distributionCenterForm.valid) {
      this.distributionCenterService.create(this.distributionCenterForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Centro de Distribución ha sido creado correctamente', 'success');
        this.router.navigate(['/distribution-centers']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.distributionCenterForm.valid) {
      this.distributionCenterService.update(this.distributionCenterId, this.distributionCenterForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Centro de Distribución ha sido actualizado correctamente', 'success');
        this.router.navigate(['/distribution-centers']);
      });
    }
  }
}