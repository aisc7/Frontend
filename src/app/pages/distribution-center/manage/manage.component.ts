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

export class ManageDistributionCenterComponent implements OnInit {
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
      this.distributionCenterId = this.route.snapshot.params.id;
      this.getDistributionCenter(this.distributionCenterId);
    }
  }

  configFormGroup() {
    this.distributionCenterForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.distributionCenterForm.controls;
  }

  getDistributionCenter(id: number) {
    this.distributionCenterService.get(id).subscribe((data) => {
      this.distributionCenterForm.patchValue(data);
    });
  }

  create() {
    this.trySend = true;
    if (this.distributionCenterForm.valid) {
      this.distributionCenterService.create(this.distributionCenterForm.value).subscribe(() => {
        Swal.fire('Creado', 'El centro de distribución ha sido creado correctamente', 'success');
        this.router.navigate(['/distribution-centers']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.distributionCenterForm.valid) {
      this.distributionCenterService.update(this.distributionCenterId, this.distributionCenterForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El centro de distribución ha sido actualizado correctamente', 'success');
        this.router.navigate(['/distribution-centers']);
      });
    }
  }
  delete () {
    this.distributionCenterService.delete(this.distributionCenterId).subscribe(() => {
      Swal.fire('Eliminado', 'El centro de distribución ha sido eliminado correctamente', 'success');
      this.router.navigate(['/distribution-centers']);
    });
  }
}