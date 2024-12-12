import { Vehiculo } from './vehiculo.model';

export class Seguro {
    id: number;
    compania: string;
    numeroPoliza: number;
    fechaVencimiento: Date;
    vehiculo_id: number;
    createdAt: Date;
    updatedAt: Date;
    vehiculo: Vehiculo;
}