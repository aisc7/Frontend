import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FacturaService } from './../../../services/factura.service';
import { Factura } from 'src/app/models/factura.model';
import Swal from 'sweetalert2';
import { CuotaService } from 'src/app/services/cuota.service';
import { SpentService } from 'src/app/services/spent.service';
import { Cuota } from 'src/app/models/cuota.model';
import { Spent } from 'src/app/models/spent.model';

@Component({
  selector: 'app-manage-factura',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageFacturaComponent implements OnInit {
  facturaForm: FormGroup;
  facturaId: number | undefined;
  mode: number = 0; // 1: View, 2: Create, 3: Update, 4: Delete
  trySend: boolean = false;
  factura:Factura;
  cuotas:Cuota[]//arreglo de cuotas
  spents:Spent[]//arreglo de gastos

  constructor(
    private formBuilder: FormBuilder,
    private facturaService: FacturaService,
    private router: Router,
    private route: ActivatedRoute,
    private cuotasService:CuotaService, 
    private spentsService:SpentService
  ) {
    this.cuotas=[]
    this.spents=[]
    this.configFormGroup();
    this.factura={id:0, fecha_emision:"", monto_total:0, estado:"", cuota:{id:null}, spent:{id:null}
    }
  }

  cuotasList(){
    this.cuotasService.list().subscribe(data=>{
      this.cuotas=data;
    })
  }
  spentsList(){
    this.spentsService.list().subscribe(data=>{
      this.spents=data;
    })
  }

  ngOnInit(): void {
    this.cuotasList()
    this.spentsList()
    this.configFormGroup();
    const currentUrl = this.route.snapshot.url.join('/');
    if (currentUrl.includes('view')) {
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    } else if (currentUrl.includes('delete')) {
      this.mode = 4;
    } else if (currentUrl.includes('payment')) { // Nuevo modo para pagos
      this.mode = 5;
    }

    this.facturaId = this.route.snapshot.params['id'];
    if (this.facturaId && this.mode !== 2) {
      this.getFactura(this.facturaId);
    }
  }


  handlePayment() {
    if (this.mode === 5) {
      Swal.fire({
        title: 'Confirmar Pago',
        text: '¿Está seguro de que desea procesar el pago de esta factura?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, pagar',
        cancelButtonText: 'Cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          this.facturaService.payment(this.facturaId!).subscribe(
            () => {
              Swal.fire('Pagado', 'El pago se ha procesado correctamente.', 'success');
              this.router.navigate(['/facturas']);
            },
            (error) => {
              Swal.fire('Error', 'Ocurrió un error al procesar el pago.', 'error');
            }
          );
        }
      });
    }
  }
  
  configFormGroup() {
    this.facturaForm = this.formBuilder.group({
      fecha_emision: ['', Validators.required],
      monto_total: ['', Validators.required],
      estado: ['', Validators.required],
      cuota_id: [null],
      spent_id: [null],
    },
    {
      validator: this.validateSingleSelection,
    }
  );
  }

  get formControls() {
    return this.facturaForm.controls;
  }

  validateSingleSelection(formGroup: FormGroup) {
    const cuotaId = formGroup.get('cuota_id')?.value;
    const spentId = formGroup.get('spent_id')?.value;
  
    // Validar que solo uno esté presente (XOR lógico)
    if ((cuotaId && spentId) || (!cuotaId && !spentId)) {
      return { singleSelectionInvalid: true }; // Retorna un error si no se cumple la regla
    }
    return null; // Retorna null si es válido
  }
  

  getFactura(id: number) {
    this.facturaService.get(id).subscribe((data: Factura) => {
      // Asegurarse de que la fecha esté en el formato 'YYYY-MM-DD'
      const formattedDate = new Date(data.fecha_emision).toISOString().split('T')[0];
      data.fecha_emision = formattedDate;  // Asignamos la fecha formateada al objeto
      this.facturaForm.patchValue(data);  // Actualizamos el formulario con los datos de la factura
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
    if (this.facturaForm.valid) {
      // Asegurarse de que la fecha esté en el formato 'YYYY-MM-DD'
      const formattedDate = new Date(this.facturaForm.value.fecha_emision).toISOString().split('T')[0];
      const facturaData = { ...this.facturaForm.value, fecha_emision: formattedDate };
  
      this.facturaService.create(facturaData).subscribe(
        () => {
          Swal.fire('Creado', 'La factura ha sido creada correctamente.', 'success');
          this.router.navigate(['/facturas']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al crear la factura.', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Debe corregir los errores antes de crear la factura.', 'error');
    }
  }

  update() {
    this.trySend = true;
    if (this.facturaForm.valid) {
      // Asegurarse de que la fecha esté en el formato 'YYYY-MM-DD'
      const formattedDate = new Date(this.facturaForm.value.fecha_emision).toISOString().split('T')[0];
      const facturaData = { ...this.facturaForm.value, fecha_emision: formattedDate };
  
      this.facturaService.update(this.facturaId!, facturaData).subscribe(
        () => {
          Swal.fire('Actualizado', 'La factura ha sido actualizada correctamente.', 'success');
          this.router.navigate(['/facturas']);
        },
        (error) => {
          Swal.fire('Error', 'Ocurrió un error al actualizar la factura.', 'error');
        }
      );
    }
  }
}