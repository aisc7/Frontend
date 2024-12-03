import { Servicio } from './servicio.model';
import { Conductor } from './conductor.model';
import { Factura } from './factura.model';
import { Dueno } from './dueno.model';

export class Spent {
    id: number;
    description: string;
    monto: number;
    date: Date;
    servicioId: number;
    conductorId: number;
    duenoId: number;
    createdAt: Date;
    updatedAt: Date;
    servicio: Servicio;
    factura: Factura;
    conductor: Conductor;
    dueno: Dueno;
}
