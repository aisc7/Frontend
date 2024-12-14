import { Contract } from './contract.model';
import { Factura } from './factura.model';


export class Cuota {
    id?: number; // ID único de la cuota
    monto: number; // Monto de la cuota
    fecha_vencimiento: string; // Fecha de vencimiento de la cuota
    estado_pago: string; // Estado del pago de la cuota (por ejemplo: pagado, pendiente)
    contract_id: number; // ID del contrato asociado
    created_at?: string; // Fecha de creación
    updated_at?: string; // Fecha de última actualización
}