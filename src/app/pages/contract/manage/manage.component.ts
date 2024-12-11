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
      this.contractId = this.route.snapshot.params.id;
      this.getContract(this.contractId);
    }
  }

  configFormGroup() {
    this.contractForm = this.theFormBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
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

  create() {
    this.trySend = true;
    if (this.contractForm.valid) {
      this.contractService.create(this.contractForm.value).subscribe(() => {
        Swal.fire('Creado', 'El contrato ha sido creado correctamente', 'success');
        this.router.navigate(['/contracts']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.contractForm.valid) {
      this.contractService.update(this.contractId, this.contractForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El contrato ha sido actualizado correctamente', 'success');
        this.router.navigate(['/contracts']);
      });
    }
  }
  delete () {
    this.trySend = true;
    if (this.contractForm.valid) {
      this.contractService.delete(this.contractId).subscribe(() => {
        Swal.fire('Eliminado', 'El contrato ha sido eliminado correctamente', 'success');
        this.router.navigate(['/contracts']);
      });
    }
  }
}