import { Vehiculo } from './vehiculo.model';
import { Conductor } from './conductor.model';

export class VehicleDriver {
    id?: number; // ID único
    fecha_asignacion?: Date; // Fecha de asignación
    fecha_desasignacion?: Date; // Fecha de desasignación
    vehiculo?: Vehiculo; // ID del vehículo relacionado
    conductor?: Conductor; // ID del conductor relacionado
    created_at?: string; // Fecha de creación
    updated_at?: string; // Fecha de última actualización
}