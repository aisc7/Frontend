
import { Spent } from './spent.model';
import { Conductor } from './conductor.model';
import { Administrator } from './administrator.model';
import { Hotel } from './hotel.model';
import { Restaurant } from './restaurant.model';

export class Servicio {
    id?: number; // ID autogenerado
    descripcion: string; // Descripción del servicio
    costo: number; // Costo del servicio
    created_at?: Date; // Fecha de creación (autogenerado)
    updated_at?: Date; // Fecha de actualización (autogenerado)
}  