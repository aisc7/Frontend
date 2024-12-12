import { Customer } from './costumer.model';
import { NaturalPerson } from './natural-person.model';

export class Company {
  id: number;
  company_type: string;
  fiscal_address: string;
  customer_id: number;
  createdAt: Date;
  updatedAt: Date;
  customer: Customer;
  NaturalPeople: NaturalPerson;

}
