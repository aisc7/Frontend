import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Payment } from "../models/payment.model"; // Asegúrate de que este modelo contenga todos los campos necesarios
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  // Método para crear un pago
  create(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(
      `${environment.url_ms_paymentAKJ}/facturas/procesarPago`, 
      payment
    );
  }

  // Método para obtener los detalles de la factura por ID
  getFacturaById(facturaId: string): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_paymentAKJ}/facturas/${facturaId}`);
  }

  // Método para obtener los detalles del cliente por ID de cuota
  getCustomerByCuotaId(cuotaId: string): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_paymentAKJ}/clientes/por-cuota/${cuotaId}`);
  }

  // Método para obtener los detalles del cliente por ID de gasto
  getCustomerBySpentId(spentId: string): Observable<any> {
    return this.http.get<any>(`${environment.url_ms_paymentAKJ}/clientes/por-gasto/${spentId}`);
  }
}
