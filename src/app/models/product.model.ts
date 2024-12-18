
import { CategoryProduct } from './category-product.model';
import { Category } from './category.model';
import { Batch } from './batch.model';
import { Customer } from './costumer.model';

export class Product {
    id?: number; // ID del producto
    name?: string; // Nombre del producto
    description?: string; // Descripción del producto
    batch?: Batch; // ID del lote
    customer?: Customer; // ID del cliente
    created_at?: string; // Fecha de creación
    updated_at?: string; // Fecha de última actualización
}