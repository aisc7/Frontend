import { Servicio } from './servicio.model';
import { Conductor } from './conductor.model';
import { Factura } from './factura.model';
import { Dueno } from './dueno.model';

export class Spent {
    id: number;
    description: string;
    monto: number;
    date: Date;
    servicio_id: number;
    conductor_id: number;
    dueno_id: number;
    createdAt: Date;
    updatedAt: Date;
    servicio: Servicio;
    factura: Factura;
    conductor: Conductor;
    dueno: Dueno;
}
