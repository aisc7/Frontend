import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NaturalPersonService } from './../../../services/natural-person.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageNaturalPersonComponent implements OnInit {
  naturalPersonForm: FormGroup;
  naturalPersonId: number | null = null;
  mode: number; // 1- View, 2- Create, 3- Update, 4- Delete
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private naturalPersonService: NaturalPersonService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    this.handleMode();
    if (this.mode !== 2 && this.route.snapshot.params['id']) {
      this.naturalPersonId = +this.route.snapshot.params['id']; // Convert to number
      this.getNaturalPerson(this.naturalPersonId);
    }
  }

  configFormGroup(): void {
    this.naturalPersonForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      user_id: ['', Validators.required],
      document_type: ['', Validators.required],
      document_number: ['', Validators.required],
      birth_date: ['', Validators.required],
      company_id: ['', Validators.required],
      customer_id: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.naturalPersonForm.controls;
  }

  handleMode(): void {
    const currentUrl = this.route.snapshot.routeConfig?.path || '';

    switch (true) {
      case currentUrl.includes('view'):
        this.mode = 1;
        break;
      case currentUrl.includes('create'):
        this.mode = 2;
        break;
      case currentUrl.includes('update'):
        this.mode = 3;
        break;
      case currentUrl.includes('delete'):
        this.mode = 4;
        break;
      default:
        this.mode = 2; // Default to Create
        break;
    }
  }

  getNaturalPerson(id: number): void {
    this.naturalPersonService.get(id).subscribe({
      next: (data) => {
        this.naturalPersonForm.patchValue(data);
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cargar la información de la persona natural', 'error');
      }
    });
  }

  create(): void {
    this.trySend = true;
    if (this.naturalPersonForm.valid) {
      this.naturalPersonService.create(this.naturalPersonForm.value).subscribe({
        next: () => {
          Swal.fire('Creado', 'La Persona Natural ha sido creada correctamente', 'success');
          this.router.navigate(['/natural-persons']);
        },
        error: () => {
          Swal.fire('Error', 'No se pudo crear la Persona Natural', 'error');
        }
      });
    }
  }

  update(): void {
    this.trySend = true;
    if (this.naturalPersonForm.valid && this.naturalPersonId !== null) {
      this.naturalPersonService.update(this.naturalPersonId, this.naturalPersonForm.value).subscribe({
        next: () => {
          Swal.fire('Actualizado', 'La Persona Natural ha sido actualizada correctamente', 'success');
          this.router.navigate(['/natural-persons']);
        },
        error: () => {
          Swal.fire('Error', 'No se pudo actualizar la Persona Natural', 'error');
        }
      });
    }
  }

  delete(): void {
    if (this.naturalPersonId !== null) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.naturalPersonService.delete(this.naturalPersonId).subscribe({
            next: () => {
              Swal.fire('Eliminado', 'La Persona Natural ha sido eliminada correctamente', 'success');
              this.router.navigate(['/natural-persons']);
            },
            error: () => {
              Swal.fire('Error', 'No se pudo eliminar la Persona Natural', 'error');
            }
          });
        }
      });
    }
  }
}
