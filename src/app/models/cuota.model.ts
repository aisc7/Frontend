import { Contract } from './contract.model';
import { Factura } from './factura.model';


export class Cuota {
    id: number;
    monto: number;
    fecha_vencimiento: Date;
    estado_pago: string;
    contract_id: number;
    createdAt: Date;
    updatedAt: Date;
    contract: Contract;
    factura: Factura;
}