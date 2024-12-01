import { Servicio } from './servicio.model';

export class Administrator {
    id: number;
    userId: string;
    servicioId: number;
    createdAt: Date;
    updatedAt: Date;
    servicio: Servicio;
}