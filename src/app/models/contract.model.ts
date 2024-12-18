import { Cuota } from './cuota.model';
import { Route } from './route.model';
import { Vehiculo } from './vehiculo.model';
import { Customer } from './costumer.model';

export class Contract {
    id?: number;
    fecha_inicio?: Date;
    fecha_fin?: Date;
    estado?: string;
    detalles_servicio?: string;
    customer?:Customer;
}