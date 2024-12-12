import { Product } from './product.model';
import { Route } from './route.model';
import { AddreRouteOrder } from './addre-route-order.model';

export class Batch {
    id: number;
    quantity: number;
    route_id: number;
    addreroute_id: number;
    createdAt: Date;
    products: Product[];
    routes: Route;
    addreroute: AddreRouteOrder;
}