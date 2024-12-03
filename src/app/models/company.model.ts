import { Customer } from './costumer.model';
import { NaturalPerson } from './natural-person.model';

export class Company {
  id: number;
  companyType: string;
  fiscalAddress: string;
  customerId: number;
  createdAt: Date;
  updatedAt: Date;
  customer: Customer;
  naturalPeople: NaturalPerson;

}
