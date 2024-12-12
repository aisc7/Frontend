import { Servicio } from './servicio.model';

export class Restaurant {
    id: number;
    stars: number;
    servicio_id: number;
    createdAt: Date;
    updatedAt: Date;
    service: Servicio;
}