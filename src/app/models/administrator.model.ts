import { Servicio } from './servicio.model';

export class Administrator {
    id?: number; // ID opcional
    user_id: string;
    servicio_id: number;
    created_at?: string;
    updated_at?: string;
}  