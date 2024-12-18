import { Cuota } from './cuota.model';
import { Spent } from './spent.model';

export class Factura {
    id: number; // ID único de la factura
    fecha_emision?: string; // Fecha de emisión de la factura
    monto_total?: number; // Monto total de la factura
    estado?: string; // Estado de la factura
    cuota?:Cuota;
    spent?:Spent; 
    created_at?: string; // Fecha de creación
    updated_at?: string; // Fecha de última actualización
}