export type ProductCategory =
  | "Todos"
  | "Creatinas"
  | "Proteínas"
  | "Pre-entrenos"
  | "Salud y Vitaminas"
  | "Accesorios";

export interface Product {
  id: number;
  nombre: string;
  marca: string;
  cantidad: string;
  precio: number;
  precio_promo: number | null;
  stock: boolean;
  categoria: Exclude<ProductCategory, "Todos">;
  imagen?: string;
  tagline?: string;
  rating?: number;
  reviewsCount?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}
