import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../services/payment.service'; // Cambié a tu servicio PaymentService
import { CustomerService } from '../services/costumer.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html'
})
export class PaymentComponent implements OnInit {
  paymentForm: FormGroup;
  factura: any;
  cliente: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private paymentService: PaymentService, // Cambié a tu servicio PaymentService
    private customerService: CustomerService
  ) {
    this.paymentForm = this.fb.group({
      bill: ['', Validators.required],
      value: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      cell_phone: ['', Validators.required],
      doc_number: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      // ... otros controles existentes en el formulario
    });
  }

  ngOnInit() {
    const facturaId = this.route.snapshot.paramMap.get('id');
    if (facturaId) {
      this.loadFacturaDetails(facturaId);
    }
  }

  loadFacturaDetails(facturaId: string) {
    this.paymentService.getFacturaById(facturaId).subscribe(
      (factura) => {
        this.factura = factura;
        this.prefillFacturaDetails(factura);
        
        // Cargar detalles del cliente o entidad asociada
        if (factura.cuota_id) {
          this.loadClienteDetailsFromCuota(factura.cuota_id);
        } else if (factura.gasto_id) {
          this.loadClienteDetailsFromGasto(factura.gasto_id);
        }
      },
      (error) => {
        console.error('Error al cargar detalles de la factura', error);
      }
    );
  }

  loadClienteDetailsFromCuota(cuotaId: string) {
    this.paymentService.getCustomerByCuotaId(cuotaId).subscribe(
      (cliente) => {
        this.prefillClienteDetails(cliente);
      },
      (error) => {
        console.error('Error al cargar detalles del cliente desde cuota', error);
      }
    );
  }

  loadClienteDetailsFromGasto(gastoId: string) {
    this.paymentService.getCustomerBySpentId(gastoId).subscribe(
      (cliente) => {
        this.prefillClienteDetails(cliente);
      },
      (error) => {
        console.error('Error al cargar detalles del cliente desde gasto', error);
      }
    );
  }

  prefillFacturaDetails(factura: any) {
    this.paymentForm.patchValue({
      bill: factura.id,
      value: factura.monto_total
    });
  }

  prefillClienteDetails(cliente: any) {
    this.paymentForm.patchValue({
      name: cliente.nombre,
      last_name: cliente.apellido,
      email: cliente.email,
      phone: cliente.telefono,
      cell_phone: cliente.celular,
      doc_number: cliente.numero_documento,
      city: cliente.ciudad,
      address: cliente.direccion
    });
  }

  submitPayment() {
    if (this.paymentForm.valid) {
      const paymentData = this.paymentForm.value;
      this.paymentService.create(paymentData).subscribe(
        (response) => {
          console.log('Pago procesado exitosamente', response);
          // Manejar respuesta exitosa
        },
        (error) => {
          console.error('Error al procesar el pago', error);
          // Manejar error
        }
      );
    }
  }
}
