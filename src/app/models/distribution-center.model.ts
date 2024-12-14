import { Address } from './address.model';
import { Municipality } from './municipality.model';

export class DistributionCenter {
  id?: number; // ID opcional
  name: string;
  phone: string;
  email: string;
  capacity: number;
  address_id: number;
  municipality_id: number;
  created_at?: string;
  updated_at?: string;
}