"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";

export default function HomePage() {
  const { data, isPending, error } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetch("/products.json").then((res) => res.json()),
  });

  if (error) return <p>ERROR</p>;

  if (isPending || !data) return <p>Loading</p>;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="grid grid-cols-3 max-w-[1200px] w-[95%] mx-auto gap-8">
        {data.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="duration-150 hover:scale-105"
          >
            <div className="relative w-3/4 mx-auto h-52">
              <Image
                src={product.image}
                alt={`${product.title} image`}
                fill
                objectFit="cover"
                objectPosition="top"
              />
            </div>
            <div className="mt-2">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                {product.title}
              </h4>

              <div className="flex justify-between opacity-70">
                <p className="flex gap-2 items-center">
                  <AiFillStar />
                  <span className="font-bold">{product.rating.rate}</span>
                </p>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm">
                    {product.category}
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}