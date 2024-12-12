import { Servicio } from './servicio.model';

export class Administrator {
    id: number;
    user_id: string;
    servicio_id: number;
    createdAt: Date;
    updatedAt: Date;
    servicio: Servicio;
}