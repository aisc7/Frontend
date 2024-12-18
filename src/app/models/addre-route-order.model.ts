import { Address } from './address.model';
import { Route } from './route.model';
import { Batch } from './batch.model';

export class AddreRouteOrder {
    id?: number;
    address?: Address;
    route?: Route;
    created_at?: string;
    updated_at?: string;
}  