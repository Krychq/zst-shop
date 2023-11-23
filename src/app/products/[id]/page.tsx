"use client";

import { getProduct } from "@/actions/getProduct";
import { useQuery } from "@tanstack/react-query";

interface ProductPageProps {
  params: { id: string };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const { data, isPending, error } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => getProduct(params.id),
  });

  if (!data || isPending) return <p>Loading</p>;

  if (error) return <p>ERROR</p>;

  return <code>{JSON.stringify(data)}</code>;
};

export default ProductPage;
