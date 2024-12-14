import { Municipality } from './municipality.model';

export class Department {
  id?: number; // ID único del departamento (autogenerado, opcional)
  name: string; // Nombre del departamento (requerido)
  description?: string; // Descripción del departamento (opcional)
  createdAt?: Date; // Fecha de creación (opcional, autogenerada)
  updatedAt?: Date; // Fecha de actualización (opcional, autogenerada)
}