import { Shift } from './shift.model';
import { VehicleDriver } from './vehicle-driver.model';
import { Dueno } from './dueno.model';
import { Vehiculo } from './vehiculo.model';
import { Spent } from './spent.model';
import { Servicio } from './servicio.model';

export class Conductor {
    id: number; // Identificador único del conductor
  user_id: string; // ID del usuario asociado
  licencia: string; // Número de licencia
  tipo_licencia: string; // Tipo de licencia
  telefono: string; // Teléfono del conductor
  created_at?: Date; // Fecha de creación (opcional)
  updated_at?: Date; // Fecha de última actualización (opcional)
}   