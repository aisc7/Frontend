import { Servicio } from './servicio.model';

export class Hotel {
    id: number;
    stars: number;
    servicioId: number;
    createdAt: Date;
    updatedAt: Date;
    service: Servicio;
}