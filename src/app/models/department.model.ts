import { Municipality } from './municipality.model';

export class Department {
  id: number;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  municipalities: Municipality[];
}