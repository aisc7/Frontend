import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from './../../../services/company.service';
import { Company } from 'src/app/models/company.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  companyForm: FormGroup;
  companyId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.companyId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.companyId) {
      this.companyService.get(this.companyId).subscribe((data: Company) => {
        this.companyForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.companyForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.companyForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.companyForm.valid) {
      this.companyService.create(this.companyForm.value).subscribe(() => {
        Swal.fire('Creado', 'La Compañía ha sido creada correctamente', 'success');
        this.router.navigate(['/companies']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.companyForm.valid) {
      this.companyService.update(this.companyId, this.companyForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La Compañía ha sido actualizada correctamente', 'success');
        this.router.navigate(['/companies']);
      });
    }
  }
}