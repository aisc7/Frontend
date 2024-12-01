import { Cuota } from './cuota.model';
import { Spent } from './spent.model';

export class Factura {
    id: number;
    fechaEmision: string;
    montoTotal: number;
    estado: string;
    cuotaId: number | null;
    spentId: number | null;
    createdAt: Date;
    updatedAt: Date;
    cuota: Cuota;
    spent: Spent;
}