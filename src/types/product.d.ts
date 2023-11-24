export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  images: string[];
  rating: {
    rate: number;
    count: number;
  };
  sizes: ProductSize[];
}

export interface ProductSize {
  size: string;
  quantity: number;
}
