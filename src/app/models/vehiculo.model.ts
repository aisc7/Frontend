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
    id?: number;
    tipo_vehiculo?: string;
    capacidad_peso?: number;
    capacidad_volumen?: number;
    estado?: string;
    createdAt?: Date;
    updatedAt?: Date;
    
}