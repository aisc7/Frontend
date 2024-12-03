
import { Municipality } from './municipality.model';
import { Vehiculo } from './vehiculo.model';

export class Operation {
    id: number;
    startDate: Date;
    endDate: Date;
    municipalityId: number;
    vehiculoId: number;
    createdAt: Date;
    updatedAt: Date;
    municipality: Municipality;
    vehiculo: Vehiculo;
}
