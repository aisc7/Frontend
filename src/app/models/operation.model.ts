
import { Municipality } from './municipality.model';
import { Vehiculo } from './vehiculo.model';

export class Operation {
    id: number;
    startDate: Date;
    endDate: Date;
    municipality_id: number;
    vehiculo_id: number;
    createdAt: Date;
    updatedAt: Date;
    municipality: Municipality;
    vehiculo: Vehiculo;
}
