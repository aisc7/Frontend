import { Product } from './product.model';
import { Route } from './route.model';
import { AddreRouteOrder } from './addrerouteorder.model';

export class Batch {
    id: number;
    quantity: number;
    routeId: number;
    addrerouteId: number;
    createdAt: Date;
    products: Product[];
    route: Route;
    addreroute: AddreRouteOrder;
}