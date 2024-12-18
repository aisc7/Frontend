import { Servicio } from './servicio.model';
import { Conductor } from './conductor.model';
import { Factura } from './factura.model';
import { Dueno } from './dueno.model';

export class Spent {
    id?: number; // ID único del gasto
    description?: string; // Descripción del gasto
    monto?: number; // Monto del gasto
    date?: string; // Fecha del gasto
    servicio?: Servicio; // ID del servicio relacionado
    conductor?: Conductor; // ID del conductor relacionado
    dueno?:Dueno; // ID del dueño relacionado
    created_at?: string; // Fecha de creación
    updated_at?: string; // Fecha de última actualización
}
