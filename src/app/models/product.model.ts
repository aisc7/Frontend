
import { CategoryProduct } from './category-product.model';
import { Category } from './category.model';
import { Batch } from './batch.model';
import { Customer } from './costumer.model';

export class Product {
    id: number;
    name: string;
    description: string;
    batchId: number;
    customerId: number;
    createdAt: Date;
    updatedAt: Date;
    categoryProducts: CategoryProduct[];
    categories: Category[];
    batch: Batch;
    customer: Customer;
}