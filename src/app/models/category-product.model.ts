import { Product } from './product.model';
import { Category } from './category.model';

export class CategoryProduct {
    id: number;
    fechaAsignacion: Date;
    fechaDesasignacion: Date;
    productId: number;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}
