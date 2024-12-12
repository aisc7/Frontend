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
    this.setMode(currentUrl);

    if (this.route.snapshot.params.id) {
      this.distributionCenterId = this.route.snapshot.params.id;
      if (this.mode !== 4) {  // Don't fetch data in delete mode
        this.getDistributionCenter(this.distributionCenterId);
      }
    }
  }

  // Set the mode based on the current URL
  setMode(currentUrl: string) {
    switch (true) {
      case currentUrl.includes("view"):
        this.mode = 1; // View Mode
        break;
      case currentUrl.includes("create"):
        this.mode = 2; // Create Mode
        break;
      case currentUrl.includes("update"):
        this.mode = 3; // Update Mode
        break;
      case currentUrl.includes("delete"):
        this.mode = 4; // Delete Mode
        break;
      default:
        this.mode = 1; // Default to View Mode
    }
  }

  configFormGroup() {
    this.distributionCenterForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      capacity: ['', Validators.required],
      address_id: ['', Validators.required],
      municipality_id: ['', Validators.required]
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

  delete() {
    this.distributionCenterService.delete(this.distributionCenterId).subscribe(() => {
      Swal.fire('Eliminado', 'El centro de distribución ha sido eliminado correctamente', 'success');
      this.router.navigate(['/distribution-centers']);
    });
  }

  cancel() {
    this.router.navigate(['/distribution-centers']);
  }
}
