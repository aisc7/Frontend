import { Contract } from './contract.model';
import { Product } from './product.model';
import { Company } from './company.model';
import { NaturalPerson } from './natural-person.model';

export class Customer {
    id: number;
    userId: string;
    phone: string;
    orderCount: number;
    createdAt: Date;
    updatedAt: Date;
    contracts: Contract[];
    products: Product[];
    company: Company;
    naturalPerson: NaturalPerson;
}