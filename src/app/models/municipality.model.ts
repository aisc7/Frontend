import { Department } from './department.model';
import { Address } from './address.model';
import { DistributionCenter } from './distribution-center.model';
import { Operation } from './operation.model';
import { Vehiculo } from './vehiculo.model';

export class Municipality {
    id: number;
    name: string;
    description: string;
    departmentId: number;
    createdAt: Date;
    updatedAt: Date;
    department: Department;
    addresses: Address[];
    distributionCenters: DistributionCenter[];
    operations: Operation[];
    conductores: Vehiculo[];
}