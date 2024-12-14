import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from './../../../services/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageCompanyComponent implements OnInit {
  companyForm: FormGroup;
  companyId: number | null = null;
  mode: number = 2; // Default to create
  trySend: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1; // Modo Ver
    } else if (currentUrl.includes('create')) {
      this.mode = 2; // Modo Crear
    } else if (currentUrl.includes('update')) {
      this.mode = 3; // Modo Actualizar
    } else if (currentUrl.includes('delete')) {
      this.mode = 4; // Modo Eliminar
    }

    if (this.route.snapshot.params['id']) {
      this.companyId = +this.route.snapshot.params['id'];
      this.getCompany(this.companyId);
    }
  }

  configFormGroup() {
    this.companyForm = this.formBuilder.group({
      company_type: ['', Validators.required],
      fiscal_address: ['', Validators.required],
      customer_id: ['', Validators.required]
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

  handleAction() {
    if (this.mode === 2) {
      this.create();
    } else if (this.mode === 3) {
      this.update();
    }
  }

  create() {
    this.trySend = true;
    if (this.companyForm.valid) {
      this.companyService.create(this.companyForm.value).subscribe(() => {
        Swal.fire('Creado', 'La empresa ha sido creada correctamente', 'success');
        this.router.navigate(['/companies']);
      });
    } else {
      Swal.fire('Error', 'Complete todos los campos obligatorios', 'error');
    }
  }

  update() {
    this.trySend = true;
    if (this.companyForm.valid) {
      this.companyService.update(this.companyId!, this.companyForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'La empresa ha sido actualizada correctamente', 'success');
        this.router.navigate(['/companies']);
      });
    } else {
      Swal.fire('Error', 'Complete todos los campos obligatorios', 'error');
    }
  }

  delete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Esta empresa será eliminada!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.companyService.delete(this.companyId!).subscribe(() => {
          Swal.fire('Eliminado', 'La empresa ha sido eliminada', 'success');
          this.router.navigate(['/companies']);
        });
      }
    });
  }
}