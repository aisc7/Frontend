import { Product } from './product.model';
import { Category } from './category.model';

export class CategoryProduct {
    id?: number;
    fecha_asignacion?: Date;
    fecha_desasignacion?: Date;
    product?: Product;
    category?: Category;
}
