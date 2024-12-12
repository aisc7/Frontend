import { Cuota } from './cuota.model';
import { Spent } from './spent.model';

export class Factura {
    id: number;
    fecha_emision: string;
    monto_total: number;
    estado: string;
    cuota_id: number | null;
    spent_id: number | null;
    createdAt: Date;
    updatedAt: Date;
    cuota: Cuota;
    spent: Spent;
}