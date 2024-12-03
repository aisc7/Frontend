import { Municipality } from './municipality.model';
import { DistributionCenter } from './distribution-center.model';
import { AddreRouteOrder } from './addre-route-order.model';
import { Route } from './route.model';

export class Address {
    id: number;
    street: string;
    number: string;
    neighborhood: string;
    reference: string;
    municipalityId: number;
    createdAt: Date;
    updatedAt: Date;
    municipality: Municipality;
    distributionCenter: DistributionCenter;
    addrerouteorders: AddreRouteOrder[];
    conductores: Route[];
}