import { Vehiculo } from './vehiculo.model';
import { Conductor } from './conductor.model';

export class VehicleDriver {
    id?: number; // ID único
    fecha_asignacion: string; // Fecha de asignación
    fecha_desasignacion: string; // Fecha de desasignación
    vehiculo_id: number; // ID del vehículo relacionado
    conductor_id: number; // ID del conductor relacionado
    created_at?: string; // Fecha de creación
    updated_at?: string; // Fecha de última actualización
}