export interface Product {
  id: number;
  name: string;
  image: string;
  stock: number;
  minStock: number;
  category: string; // O puedes usar un literal: 'Gaseosas' | 'Cerveza' | etc.
}