import { Company } from './company.model';
import { Customer } from './costumer.model';

export class NaturalPerson {
    id: number;
    userId: string;
    documentType: string;
    documentNumber: string;
    birthDate: Date;
    companyId: number | null;
    customerId: number;
    createdAt: Date;
    updatedAt: Date;
    company: Company;
    customer: Customer;
}
