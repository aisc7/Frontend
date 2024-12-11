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

export class ManageCompanyComponent implements OnInit {
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
      this.companyId = this.route.snapshot.params.id;
      this.getCompany(this.companyId);
    }
  }

  configFormGroup() {
    this.companyForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.companyForm.controls;
  }

  getCompany(id: number) {
    this.companyService.get(id).subscribe((data) => {
      this.companyForm.patchValue(data);
    });
  }

  create() {
    this.trySend = true;
    if (this.companyForm.valid) {
      this.companyService.create(this.companyForm.value).subscribe(() => {
        Swal.fire('Creado', 'La empresa ha sido creada correctamente', 'success');
        this.router.navigate(['/companies']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.companyForm.valid) {
      this.companyService.update(this.companyId, this.companyForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La empresa ha sido actualizada correctamente', 'success');
        this.router.navigate(['/companies']);
      });
    }
  }
  delete () {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.delete(this.companyId).subscribe(() => {
          Swal.fire('Eliminado', 'La empresa ha sido eliminada correctamente', 'success');
          this.router.navigate(['/companies']);
        });
      }
    });
  }
  
}