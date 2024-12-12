import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractService } from './../../../services/contract.service';
import { Contract } from 'src/app/models/contract.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageContractComponent implements OnInit {
  contractForm: FormGroup;
  contractId: number;
  mode: number;
  trySend: boolean = false;

  constructor(
    private theFormBuilder: FormBuilder,
    private contractService: ContractService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.configFormGroup();
  }

  ngOnInit(): void {
    const currentUrl = this.route.snapshot.url.join("/");
    console.log('Current URL:', currentUrl); // Para depurar

    // Asignar el valor del mode según la URL
    if (currentUrl.includes("view")) {
      this.mode = 1; // Ver
    } else if (currentUrl.includes("create")) {
      this.mode = 2; // Crear
    } else if (currentUrl.includes("update")) {
      this.mode = 3; // Actualizar
    } else if (currentUrl.includes("delete")) {
      this.mode = 4; // Eliminar
    } else {
      this.mode = 0; // Default si no se encuentra ninguno
    }

    console.log('Mode:', this.mode); // Para depurar

    if (this.route.snapshot.params.id) {
      this.contractId = this.route.snapshot.params.id;
      this.getContract(this.contractId);
    }
  }

  configFormGroup() {
    this.contractForm = this.theFormBuilder.group({
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      estado: ['', Validators.required],
      detalles_servicio: ['', Validators.required],
      costumer_id: ['', Validators.required],
    });
  }

  get getTheFormGroup() {
    return this.contractForm.controls;
  }

  getContract(id: number) {
    this.contractService.get(id).subscribe((data) => {
      this.contractForm.patchValue(data);
    });
  }

  handleAction() {
    this.trySend = true;
    if (this.contractForm.valid) {
      if (this.mode >= 1 && this.mode <= 4) {
        switch (this.mode) {
          case 2:
            this.create();
            break;
          case 3:
            this.update();
            break;
          case 4:
            this.delete();
            break;
          default:
            break;
        }
      } else {
        // Si mode es un valor inesperado
        Swal.fire('Error', 'Acción no válida', 'error');
      }
    }
  }

  create() {
    this.contractService.create(this.contractForm.value).subscribe(() => {
      Swal.fire('Creado', 'El contrato ha sido creado correctamente', 'success');
      this.router.navigate(['/contracts']);
    });
  }

  update() {
    this.contractService.update(this.contractId, this.contractForm.value).subscribe(() => {
      Swal.fire('Actualizado', 'El contrato ha sido actualizado correctamente', 'success');
      this.router.navigate(['/contracts']);
    });
  }

  delete() {
    this.contractService.delete(this.contractId).subscribe(() => {
      Swal.fire('Eliminado', 'El contrato ha sido eliminado correctamente', 'success');
      this.router.navigate(['/contracts']);
    });
  }
}
