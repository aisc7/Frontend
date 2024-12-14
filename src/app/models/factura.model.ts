import { Cuota } from './cuota.model';
import { Spent } from './spent.model';

export class Factura {
    id?: number; // ID único de la factura
    fecha_emision: string; // Fecha de emisión de la factura
    monto_total: number; // Monto total de la factura
    estado: string; // Estado de la factura
    cuota_id: number; // ID de la cuota asociada
    spent_id: number; // ID del gasto asociado
    created_at?: string; // Fecha de creación
    updated_at?: string; // Fecha de última actualización
}