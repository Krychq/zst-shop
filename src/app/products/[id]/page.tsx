"use client";

import { getProduct } from "@/actions/getProduct";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import Gallery from "../_components/gallery";
import { Info } from "../_components/info";
import Container from "@/components/ui/container";

interface ProductPageProps {
  params: { id: string };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
  const {
    data: product,
    isPending,
    error,
  } = useQuery<Product>({
    queryKey: ["product", params.id],
    queryFn: () => getProduct(params.id),
  });

  if (!product || isPending) return <p>Loading</p>;

  if (error) return <p>ERROR</p>;

  return (
    <Container>
      <div className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          <Gallery images={product.images} />
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <Info product={product} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ProductPage;
