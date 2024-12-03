import { VehicleDriver } from './vehicle-driver.model';
import { Conductor } from './conductor.model';
import { OwnerVehicle } from './owner-vehicle.model';
import { Dueno } from './dueno.model';
import { Route } from './route.model';
import { Contract } from './contract.model';
import { Seguro } from './seguro.model';
import { Operation } from './operation.model';
import { Municipality } from './municipality.model';

export class Vehiculo {
    id: number;
    tipoVehiculo: string;
    capacidadPeso: number;
    capacidadVolumen: number;
    estado: string;
    createdAt: Date;
    updatedAt: Date;
    vehicleDrivers: VehicleDriver[];
    ownerVehicles: OwnerVehicle[];
    routes: Route[];
    seguros: Seguro[];
    operations: Operation[];
    conductores: Conductor[];
    municipalities: Municipality[];
    duenos: Dueno[];
    contracts: Contract[];
}