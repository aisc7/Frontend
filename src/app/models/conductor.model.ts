import { Shift } from './shift.model';
import { VehicleDriver } from './vehicle-driver.model';
import { Dueno } from './dueno.model';
import { Vehiculo } from './vehiculo.model';
import { Spent } from './spent.model';
import { Servicio } from './servicio.model';

export class Conductor {
    id: number;
    userId: string;
    email: string;
    licencia: string;
    tipoLicencia: string;
    telefono: string;
    createdAt: Date;
    updatedAt: Date;
    shifts: Shift[];
    vehicleDrivers: VehicleDriver[];
    owner: Dueno;
    vehiculos: Vehiculo[];
    spents: Spent[];
    servicios: Servicio[];
}