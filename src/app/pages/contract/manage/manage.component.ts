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
export class ManageComponent implements OnInit {
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
    this.contractId = this.route.snapshot.params['id'];
    this.mode = this.route.snapshot.params['mode'];
    if (this.contractId) {
      this.contractService.get(this.contractId).subscribe((data: Contract) => {
        this.contractForm.patchValue(data);
      });
    }
  }

  configFormGroup() {
    this.contractForm = this.theFormBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.contractForm.controls;
  }

  create() {
    this.trySend = true;
    if (this.contractForm.valid) {
      this.contractService.create(this.contractForm.value).subscribe(() => {
        Swal.fire('Creado', 'El Contrato ha sido creado correctamente', 'success');
        this.router.navigate(['/contracts']);
      });
    }
  }

  update() {
    this.trySend = true;
    if (this.contractForm.valid) {
      this.contractService.update(this.contractId, this.contractForm.value).subscribe(() => {
        Swal.fire('Actualizado', 'El Contrato ha sido actualizado correctamente', 'success');
        this.router.navigate(['/contracts']);
      });
    }
  }
}