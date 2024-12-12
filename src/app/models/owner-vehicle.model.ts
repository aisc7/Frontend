
import { Vehiculo } from './vehiculo.model';
import { Dueno } from './dueno.model';

export class OwnerVehicle {
    id: number;
    fechaAsignacion: Date;
    fechaDesasignacion: Date;
    vehiculo_id: number;
    dueno_id: number;
    createdAt: Date;
    updatedAt: Date;
    vehiculo: Vehiculo;
    dueno: Dueno;
}