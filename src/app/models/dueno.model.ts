import { OwnerVehicle } from './owner-vehicle.model';
import { Vehiculo } from './vehiculo.model';
import { Conductor } from './conductor.model';
import { Spent } from './spent.model';

export class Dueno {
    id: number;
    userId: string;
    conductorId: number;
    createdAt: Date;
    updatedAt: Date;
    ownervehicles: OwnerVehicle[];
    vehiculos: Vehiculo[];
    conductor: Conductor;
    spents: Spent[];
}