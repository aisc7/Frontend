import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContractService } from './../../../services/contract.service';
import { Contract } from 'src/app/models/contract.model';
import Swal from 'sweetalert2';
import { CustomerService } from 'src/app/services/costumer.service';
import { Customer } from 'src/app/models/costumer.model';

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
  contract:Contract;
  customers:Customer[];

  constructor(
    private formBuilder: FormBuilder,
    private contractService: ContractService,
    private router: Router,
    private route: ActivatedRoute,
    private customersService:CustomerService
  ) {
    this.customers=[];
    this.configFormGroup();
    this.contract={ id:0, fecha_inicio:null, fecha_fin:null, estado:"", detalles_servicio:"", customer:{
      id:null
    } }
   
  }

  customersList(){
    this.customersService.list().subscribe(data=>{
      this.customers=data;
    })
  }

  ngOnInit(): void {
    this.customersList();
    this.configFormGroup();

    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1; // Visualizar
    } else if (currentUrl.includes('create')) {
      this.mode = 2; // Crear
    } else if (currentUrl.includes('update')) {
      this.mode = 3; // Actualizar
    } else if (currentUrl.includes('delete')) {
      this.mode = 4; // Eliminar
    }

    if (this.route.snapshot.params['id']) {
      this.contractId = +this.route.snapshot.params['id'];
      this.getContract(this.contractId);
    }
  }

  configFormGroup() {
    this.contractForm = this.formBuilder.group({
      fecha_inicio: ['', Validators.required],
      fecha_fin: ['', Validators.required],
      estado: ['', Validators.required],
      detalles_servicio: ['', Validators.required],
      customer_id: [null, Validators.required]
    });
  }

  get getTheFormGroup() {
    return this.contractForm.controls;
  }

  getContract(id: number) {
    this.contractService.get(id).subscribe((data: Contract) => {
      this.contractForm.patchValue(data);
    });
  }

  handleAction() {
    this.trySend = true;
    if (this.contractForm.valid) {
      if (this.mode === 2) {
        this.create();
      } else if (this.mode === 3) {
        this.update();
      }
    }
  }

  create() {
    this.contract = { ...this.contract, ...this.contractForm.value };
    console.log(JSON.stringify(this.contract))
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
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Este contrato será eliminado!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.contractService.delete(this.contractId).subscribe(() => {
          Swal.fire('Eliminado', 'El contrato ha sido eliminado', 'success');
          this.router.navigate(['/contracts']);
        });
      }
    });
  }
}