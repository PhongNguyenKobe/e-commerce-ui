import { ProductsType } from "@/types";
import Categories from "./Categories";
import ProductCard from "./ProductCard";
import Link from "next/link";

//temporary
const products: ProductsType = [
  {
    id: 1,
    name: "Áo thun Adidas CoreFit",
    shortDescription: "Áo thun thể thao thoáng khí, phù hợp tập luyện và mặc hàng ngày.",
    description:
      "Áo thun Adidas CoreFit với chất liệu co giãn, thấm hút mồ hôi tốt. Thiết kế đơn giản, dễ phối đồ, phù hợp với mọi hoạt động thường ngày.",
    price: 399000,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
  },
  {
    id: 2,
    name: "Áo khoác Puma Ultra Warm Zip",
    shortDescription: "Áo khoác giữ ấm, thiết kế thể thao năng động.",
    description:
      "Áo khoác Puma Ultra Warm Zip với lớp lót giữ nhiệt, khóa kéo tiện lợi. Phù hợp với thời tiết se lạnh ở miền Bắc và Đà Lạt.",
    price: 599000,
    sizes: ["S", "M", "L", "XL"],
    colors: ["gray", "green"],
    images: {
      gray: "/products/2g.png",
      green: "/products/2gr.png",
    },
  },
  {
    id: 3,
    name: "Áo hoodie Nike Air Essentials",
    shortDescription: "Áo hoodie phong cách trẻ trung, giữ ấm tốt.",
    description:
      "Nike Air Essentials Pullover là lựa chọn lý tưởng cho mùa đông. Chất liệu dày dặn, form rộng thoải mái, phù hợp với giới trẻ Việt.",
    price: 699000,
    sizes: ["S", "M", "L"],
    colors: ["green", "blue", "black"],
    images: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
  },
  {
    id: 4,
    name: "Áo thun Nike Dri-Flex",
    shortDescription: "Áo thun co giãn, thấm hút mồ hôi tốt.",
    description:
      "Nike Dri-Flex T-Shirt giúp bạn thoải mái khi vận động. Thiết kế đơn giản, màu sắc trẻ trung, phù hợp với học sinh, sinh viên.",
    price: 299000,
    sizes: ["S", "M", "L"],
    colors: ["white", "pink"],
    images: {
      white: "/products/4w.png",
      pink: "/products/4p.png",
    },
  },
  {
    id: 5,
    name: "Áo khoác Under Armour StormFleece",
    shortDescription: "Áo khoác chống gió, giữ nhiệt tốt.",
    description:
      "StormFleece là dòng áo khoác cao cấp của Under Armour, phù hợp với thời tiết lạnh ở miền núi hoặc đi phượt.",
    price: 499000,
    sizes: ["S", "M", "L"],
    colors: ["red", "orange", "black"],
    images: {
      red: "/products/5r.png",
      orange: "/products/5o.png",
      black: "/products/5bl.png",
    },
  },
  {
    id: 6,
    name: "Giày Nike Air Max 270",
    shortDescription: "Giày thể thao êm ái, phong cách hiện đại.",
    description:
      "Nike Air Max 270 với đệm khí êm ái, phù hợp đi học, đi chơi hoặc chạy bộ. Thiết kế trẻ trung, dễ phối đồ.",
    price: 599000,
    sizes: ["38", "39", "40", "42", "43"],
    colors: ["gray", "white"],
    images: {
      gray: "/products/6g.png",
      white: "/products/6w.png",
    },
  },
  {
    id: 7,
    name: "Giày Nike Ultraboost Pulse",
    shortDescription: "Giày chạy bộ nhẹ, đàn hồi tốt.",
    description:
      "Nike Ultraboost Pulse là dòng giày chuyên dụng cho chạy bộ, tập gym. Thiết kế ôm chân, đế cao su chống trượt.",
    price: 699000,
    sizes: ["39", "40", "42"],
    colors: ["gray", "pink"],
    images: {
      gray: "/products/7g.png",
      pink: "/products/7p.png",
    },
  },
  {
    id: 8,
    name: "Quần jean Levi’s Classic",
    shortDescription: "Quần jean cổ điển, chất liệu bền đẹp.",
    description:
      "Levi’s Classic Denim là mẫu quần jean phù hợp với mọi lứa tuổi. Form đứng, chất vải dày, không phai màu sau nhiều lần giặt.",
    price: 599000,
    sizes: ["S", "M", "L"],
    colors: ["blue", "green"],
    images: {
      blue: "/products/8b.png",
      green: "/products/8gr.png",
    },
  },
];

const ProductList = ({category}: {category: string}) => {
  return (
    <div className='w-full'>
        <Categories />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
            {products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
        <Link href={category ? `/products/?category=${category}` : "/products"}
        className="flex justify-end mt-4 underline text-sm text-gray-500">Xem thêm sản phẩm</Link>
    </div>
  )
}

export default ProductList