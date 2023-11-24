"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/formatPrice";
import { cn } from "@/lib/utils";
import { Product, ProductSize } from "@/types/product";
import { useMemo, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";

interface InfoProps {
  product: Product;
}

export const Info: React.FC<InfoProps> = ({ product }) => {
  const [activeSize, setActiveSize] = useState<ProductSize>(product.sizes[0]);

  const warning = useMemo(() => {
    if (activeSize.quantity > 5) return null;

    return (
      <div
        className={cn(
          buttonVariants({ variant: "destructive" }),
          "pointer-events-none"
        )}
      >
        Zostało {activeSize.quantity} sztuk!
      </div>
    );
  }, [activeSize]);

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl sm:font-bold text-gray-900">
        {product.title}
      </h1>
      <div className="mt-3 lex items-end justify-between">
        <p className="text-2xl text-gray-900">${formatPrice(product.price)}</p>
      </div>
      <hr className="my-4" />
      <p className="text-black py-4">{product.description}</p>
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="sm:font-semibold text-black">Sizes:</h3>
          <div className="space-x-2">
            {product.sizes.map((size) => (
              <Button
                variant={size.size === activeSize.size ? "default" : "outline"}
                onClick={() => setActiveSize(size)}
                key={size.size}
              >
                {size.size}
              </Button>
            ))}
          </div>
        </div>

        {warning}
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button className="flex gap-4 pl-8 py-6 pr-10 text-lg font-bold">
          <FaShoppingCart className="mr-2 h-4 w-4" /> Dodaj do koszyka
        </Button>
      </div>
    </div>
  );
};
