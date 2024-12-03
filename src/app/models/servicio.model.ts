
import { Spent } from './spent.model';
import { Conductor } from './conductor.model';
import { Administrator } from './administrator.model';
import { Hotel } from './hotel.model';
import { Restaurant } from './restaurant.model';

export class Servicio {
    id: number;
    descripcion: string;
    costo: number;
    createdAt: Date;
    updatedAt: Date;
    spents: Spent[];
    conductores: Conductor[];
    administrador: Administrator;
    hotel: Hotel;
    restaurant: Restaurant;
}