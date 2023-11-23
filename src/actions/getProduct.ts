import { Product } from "@/types/product";

export const getProduct = async (id: string) => {
  const productReq = await fetch("/products.json");
  const products: Product[] = await productReq.json();

  return products.filter((product) => product.id === id);
};
