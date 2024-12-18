import { Vehiculo } from './vehiculo.model';

export class Seguro {
    id?: number;
    compania?: string;
    numero_poliza?: number;
    fecha_vencimiento?: Date;
    vehiculo?: Vehiculo;
    createdAt?: Date;
    updatedAt?: Date;
}