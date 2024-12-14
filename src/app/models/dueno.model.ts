import { OwnerVehicle } from './owner-vehicle.model';
import { Vehiculo } from './vehiculo.model';
import { Conductor } from './conductor.model';
import { Spent } from './spent.model';

export class Dueno {
    id?: number; // ID único del dueño
    user_id: string; // ID del usuario relacionado
    conductor_id: number; // ID del conductor relacionado
    created_at?: string; // Fecha de creación
    updated_at?: string; // Fecha de última actualización
}