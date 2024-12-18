import { Contract } from './contract.model';
import { Product } from './product.model';
import { Company } from './company.model';
import { NaturalPerson } from './natural-person.model';

export class Customer {
    id?: number;
    user_id?: string; // ID del usuario
    phone?: string; // Teléfono del cliente
    order_count?: number; // Número de pedidos realizados
}  