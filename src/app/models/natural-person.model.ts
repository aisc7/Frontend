import { Company } from './company.model';
import { Customer } from './costumer.model';

export class NaturalPerson {
    id?: number;
    user_id!: string;
    document_type!: string;
    document_number!: string;
    birth_date!: string;
    company_id?: number | null;
    customer_id!: number;
}
