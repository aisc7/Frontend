import { Municipality } from './municipality.model';
import { DistributionCenter } from './distribution-center.model';
import { AddreRouteOrder } from './addre-route-order.model';
import { Route } from './route.model';

export class Address {
    id?: number; // ID autogenerado (opcional para nuevas creaciones)
    street: string; // Requerido
    number?: string; // Opcional
    neighborhood: string; // Requerido
    reference?: string; // Opcional
    municipality_id: number; // Relación foránea (requerido)
    created_at?: Date; // Autogenerado en el backend
    updated_at?: Date; // Autogenerado en el backend
}  