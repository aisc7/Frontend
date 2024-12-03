import { Vehiculo } from './vehiculo.model';
import { Conductor } from './conductor.model';

export class VehicleDriver {
    id: number;
    fechaAsignacion: Date;
    fechaDesasignacion: Date;
    vehiculoId: number;
    conductorId: number;
    createdAt: Date;
    updatedAt: Date;
    vehiculo: Vehiculo;
    conductor: Conductor;
}