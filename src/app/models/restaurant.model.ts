import { Servicio } from './servicio.model';

export class Restaurant {
    id: number;
    stars: number;
    servicioId: number;
    createdAt: Date;
    updatedAt: Date;
    service: Servicio;
}