"use client";

import { useState } from "react";
import AdminProductCard from "./ui/admin/AdminProductCard";
import { ProductType } from "@/types";

export default function PendingProductsClient({
  products,
}: {
  products: ProductType[];
}) {
  const [items, setItems] = useState(products);

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-4">
      {items.map((product) => (
        <AdminProductCard
          key={product.id}
          product={product}
          onRemove={removeItem}
        />
      ))}
    </div>
  );
}
