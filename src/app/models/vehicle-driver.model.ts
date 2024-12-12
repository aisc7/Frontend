import { Vehiculo } from './vehiculo.model';
import { Conductor } from './conductor.model';

export class VehicleDriver {
    id: number;
    fecha_asignacion: Date;
    fecha_desasignacion: Date;
    vehiculo_id: number;
    conductor_id: number;
    createdAt: Date;
    updatedAt: Date;
    vehiculo: Vehiculo;
    conductor: Conductor;
}