import { Department } from './department.model';
import { Address } from './address.model';
import { DistributionCenter } from './distribution-center.model';
import { Operation } from './operation.model';
import { Vehiculo } from './vehiculo.model';

export class Municipality {
    id?: number; // Opcional, ya que será generado automáticamente
    name: string; // Requerido
    description?: string; // Opcional
    department_id: number; // Relación foránea, requerida
    created_at?: Date; // Autogenerado en el backend
    updated_at?: Date; // Autogenerado en el backend
}   