
import { Vehiculo } from './vehiculo.model';
import { Dueno } from './dueno.model';

export class OwnerVehicle {
    id?: number; // ID único
    fecha_asignacion?: Date; // Fecha de asignación del vehículo
    fecha_desasignacion?: Date; // Fecha de designación del vehículo
    vehiculo?: Vehiculo; // ID del vehículo relacionado
    dueno?: Dueno; // ID del dueño relacionado
    created_at?: string; // Fecha de creación
    updated_at?: string; // Fecha de última actualización
}