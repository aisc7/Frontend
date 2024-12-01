import { Cuota } from './cuota.model';
import { Route } from './route.model';
import { Vehiculo } from './vehiculo.model';
import { Customer } from './customer.model';

export class Contract {
    id: number;
    fechaInicio: Date;
    fechaFin: Date;
    estado: string;
    detallesServicio: string;
    customerId: number;
    createdAt: Date;
    updatedAt: Date;
    cuotas: Cuota[];
    routes: Route[];
    vehicles: Vehiculo[];
    customer: Customer;
}