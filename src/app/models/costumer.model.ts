import { Contract } from './contract.model';
import { Product } from './product.model';
import { Company } from './company.model';
import { NaturalPerson } from './natural-person.model';

export class Customer {
    id: number;
    user_id: string;
    phone: string;
    order_count: number;
    createdAt: Date;
    updatedAt: Date;
    contracts: Contract[];
    products: Product[];
    company: Company;
    naturalperson: NaturalPerson;
}