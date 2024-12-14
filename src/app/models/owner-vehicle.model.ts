
import { Vehiculo } from './vehiculo.model';
import { Dueno } from './dueno.model';

export class OwnerVehicle {
    id?: number; // ID único
    fecha_asignacion: string; // Fecha de asignación del vehículo
    fecha_desasignacion: string; // Fecha de designación del vehículo
    vehiculo_id: number; // ID del vehículo relacionado
    dueno_id: number; // ID del dueño relacionado
    created_at?: string; // Fecha de creación
    updated_at?: string; // Fecha de última actualización
}