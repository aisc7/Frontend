import { Product } from './product.model';
import { CategoryProduct } from './category-product.model';

export class Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    categoryProducts: CategoryProduct[];
    products: Product[];
}