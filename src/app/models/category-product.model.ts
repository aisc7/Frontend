import { Product } from './product.model';
import { Category } from './category.model';

export class CategoryProduct {
    id?: number;
    fecha_asignacion?: string;
    fecha_desasignacion?: string;
    product_id?: number;
    category_id?: number;
}
