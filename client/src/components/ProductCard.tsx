"use client";

import { ProductType } from "@/types";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductCard = ({ product }: { product: ProductType }) => {
  const [productTypes, setProductTypes] = useState({
    size: product.sizes[0],
    color: product.colors[0],
  });

  const handleTypeChange = ({
    type,
    value,
  }: {
    type: "size" | "color";
    value: string;
  }) => {
    setProductTypes((prev) => ({
      ...prev,
      [type]: value,
    }));
  };
  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[2/3]">
          <Image
            src={product.images[productTypes.color]}
            alt={product.name}
            fill
            className="object-cover hover:scale-105 transition-all duration-500"
          />
        </div>
      </Link>
      {/* product details */}
      <div className="flex flex-col gap-4 p-6">
        <h1 className="font-medium">{product.name}</h1>
        <p className="text-sm text-gray-500">{product.description}</p>
        {/* product type */}
        <div className="flex items-center gap-4 text-xs">
          {/* sizes */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Sizes</span>
            <select
              name="size"
              id="size"
              className="ring ring-gray-300 rounded-md px-2 py-1"
              onChange={(e) =>
                handleTypeChange({ type: "size", value: e.target.value })
              }
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
          {/* color */}
          <div className="flex flex-col gap-1">
            <span className="text-gray-500">Màu sắc</span>
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <div
                  className={`cursor-pointer border-1 ${productTypes.color === color ? "border-gray-500":"border-gray-200"} rounded-full p-[1.6px]`}
                  key={color}
                  onClick={() =>
                    handleTypeChange({ type: "color", value: color })
                  }
                >
                  <div
                    className="w-[14px] h-[14px] rounded-full"
                    style={{ backgroundColor: color }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* price and add to cart */}
        <div className="flex items-center justify-between">
          <p className="font-medium">{product.price.toLocaleString()} đ</p>
          <button className="ring-1 ring-gray-100 shadow-lg rounded-md py-2 px-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
