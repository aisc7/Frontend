import { Customer } from './costumer.model';
import { NaturalPerson } from './natural-person.model';

export class Company {
  id?: number; // ID opcional para cuando es nuevo
  company_type: string;
  fiscal_address: string;
  customer_id: number;
  created_at?: string;
  updated_at?: string;
}
