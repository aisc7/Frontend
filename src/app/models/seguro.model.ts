import { Vehiculo } from './vehiculo.model';

export class Seguro {
    id: number;
    compania: string;
    numeroPoliza: number;
    fechaVencimiento: Date;
    vehiculoId: number;
    createdAt: Date;
    updatedAt: Date;
    vehiculo: Vehiculo;
}