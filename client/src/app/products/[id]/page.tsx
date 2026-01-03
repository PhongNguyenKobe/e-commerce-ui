import ProductInteraction from "@/components/ProductInteraction";
import { ProductType } from "@/types";
import Image from "next/image";

//temporary
const product: ProductType = {
  id: 1,
  name: "Áo thun Adidas CoreFit",
  shortDescription:
    "Áo thun thể thao thoáng khí, phù hợp tập luyện và mặc hàng ngày.",
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
};

export const generateMetadata = async({params}: {params: {id: string}}) => {
  //TODO: get product by id from db
  //temporary
  return {
    title: product.name,
    description: product.shortDescription,
  }
}

const ProductPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ color?: string; size?: string }>;
}) => {
  const { id } = await params;
  const { color, size } = (await searchParams) || {};
  const selectedSize = size || (product.sizes[0] as string);
  const selectedColor = color || (product.colors[0] as string);
  return (
    <div className="flex flex-col gap-4 lg:flex-row md:gap-12 mt-12">
      {/* Image */}
      <div className="w-full lg:w-5/12 relative aspect-[2/3]">
        <Image
          src={product.images[selectedColor]}
          alt={product.name}
          fill
          className="object-contain rounded-md"
        />
      </div>
      {/* Details */}
      <div className="w-full lg:w-7/12 flex flex-col gap-4">
        <h1 className="text-2xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.shortDescription}</p>
        <h2 className="text-2xl font-semibold">
          {product.price.toLocaleString("vi-VN")} đ
        </h2>
        <ProductInteraction product={product} selectedColor={selectedColor} selectedSize={selectedSize} />
        {/* Card info */}
        <div className="flex items-center gap-2 mt-4">
          <Image
            src="/klarna.png"
            alt="Cards"
            width={50}
            height={25}
            className="object-contain"
          />

          <Image
            src="/cards.png"
            alt="Cards"
            width={50}
            height={25}
            className="object-contain"
          />

          <Image
            src="/stripe.png"
            alt="Stripe"
            width={50}
            height={25}
            className="object-contain"
          />
          <Image
            src="/vnpay.png"
            alt="VNPay"
            width={50}
            height={25}
            className="object-contain"
          />
        </div>
        <p className="text-gray-500 text-xs">
          Khi nhấn nút Thanh toán ngay, bạn đồng ý với{" "}
          <span className="underline hover:text-black">
            Điều khoản & Điều kiện
          </span>{" "}
          và{" "}
          <span className="underline hover:text-black">Chính sách bảo mật</span>
          . Bạn cho phép chúng tôi trừ tiền từ phương thức thanh toán đã chọn
          với tổng số tiền hiển thị. Mọi giao dịch đều tuân theo chính sách đổi
          trả và{" "}
          <span className="underline hover:text-black">
            Chính sách hoàn tiền
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default ProductPage;
