
import { Municipality } from './municipality.model';
import { Vehiculo } from './vehiculo.model';

export class Operation {
    id?: number;
    start_date?: Date;
    end_date?: Date;
    createdAt?: Date;
    updatedAt?: Date;
    municipality?: Municipality;
    vehiculo?: Vehiculo;
}
