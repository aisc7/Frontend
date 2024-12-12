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
  mode: number = 2; // Modo por defecto: Crear
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
    this.mode = this.getModeFromUrl(currentUrl);

    if (this.route.snapshot.params.id) {
      this.companyId = +this.route.snapshot.params.id;
      this.getCompany(this.companyId);
    }
  }

  configFormGroup() {
    this.companyForm = this.theFormBuilder.group({
      company_type: ['', Validators.required],
      fiscal_address: ['', Validators.required],
      costumer_id: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.companyForm.controls;
  }

  getModeFromUrl(url: string): number {
    if (url.includes("view")) return 1;
    if (url.includes("create")) return 2;
    if (url.includes("update")) return 3;
    if (url.includes("delete")) return 4;
    return 2; // Default: Crear
  }

  getCompany(id: number) {
    this.companyService.get(id).subscribe((data) => {
      this.companyForm.patchValue(data);
    });
  }

  handleAction() {
    this.trySend = true;

    if (!this.companyForm.valid) {
      Swal.fire('Error', 'Por favor, complete todos los campos obligatorios.', 'error');
      return;
    }

    switch (this.mode) {
      case 2: // Crear
        this.companyService.create(this.companyForm.value).subscribe(() => {
          Swal.fire('Creado', 'La empresa ha sido creada correctamente.', 'success');
          this.router.navigate(['/companies']);
        });
        break;

      case 3: // Actualizar
        if (this.companyId !== null) {
          this.companyService.update(this.companyId, this.companyForm.value).subscribe(() => {
            Swal.fire('Actualizado', 'La empresa ha sido actualizada correctamente.', 'success');
            this.router.navigate(['/companies']);
          });
        }
        break;

      case 4: // Eliminar
        if (this.companyId !== null) {
          Swal.fire({
            title: "Eliminar",
            text: "¿Está seguro que desea eliminar esta empresa?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar"
          }).then((result) => {
            if (result.isConfirmed) {
              this.companyService.delete(this.companyId).subscribe(() => {
                Swal.fire('Eliminado', 'La empresa ha sido eliminada correctamente.', 'success');
                this.router.navigate(['/companies']);
              });
            }
          });
        }
        break;

      default:
        Swal.fire('Error', 'Modo no reconocido.', 'error');
    }
  }
}
