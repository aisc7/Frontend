import { Cuota } from './cuota.model';
import { Route } from './route.model';
import { Vehiculo } from './vehiculo.model';
import { Customer } from './costumer.model';

export class Contract {
    id: number;
    fecha_inicio: string;
    fecha_fin: string;
    estado: string;
    detalles_servicio: string;
    customer_id: number;
}