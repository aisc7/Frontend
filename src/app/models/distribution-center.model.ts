import { Address } from './address.model';
import { Municipality } from './municipality.model';

export class DistributionCenter {
  id: number;
  name: string; // nombre
  phone: string; // celular
  email: string; // correo electrónico
  capacity: number; // capacidad
  address_id: number; // dirección
  municipality_id: number; // municipio_id
  createdAt: Date;
  updatedAt: Date;
  address: Address;
  municipality: Municipality;
}