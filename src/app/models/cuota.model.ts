import { Contract } from './contract.model';
import { Factura } from './factura.model';


export class Cuota {
    id: number;
    monto: number;
    fechaVencimiento: Date;
    estadoPago: string;
    contractId: number;
    createdAt: Date;
    updatedAt: Date;

    contract: Contract;
    factura: Factura;
}