import { Address } from './address.model';
import { Municipality } from './municipality.model';

export class DistributionCenter {
  id: number;
  name: string; // nombre
  phone: string; // celular
  email: string; // correo electrónico
  capacity: number; // capacidad
  addressId: number; // dirección
  municipalityId: number; // municipio_id
  createdAt: Date;
  updatedAt: Date;
  address: Address;
  municipality: Municipality;
}