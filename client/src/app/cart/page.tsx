"use client";

import PaymentForm from "@/components/PaymentForm";
import ShippingForm from "@/components/ShippingForm";
import useCartStore from "@/stores/cardStore";
import { ArrowRight, Trash2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
// import { useState } from "react";

const steps = [
  { id: 1, title: "Giỏ hàng" },
  { id: 2, title: "Địa chỉ giao hàng" },
  { id: 3, title: "Thanh toán" },
];
//temporary
// const cartItems: CartItemsType = [
//   {
//     id: 1,
//     name: "Áo thun Adidas CoreFit",
//     shortDescription:
//       "Áo thun thể thao thoáng khí, phù hợp tập luyện và mặc hàng ngày.",
//     description:
//       "Áo thun Adidas CoreFit với chất liệu co giãn, thấm hút mồ hôi tốt. Thiết kế đơn giản, dễ phối đồ, phù hợp với mọi hoạt động thường ngày.",
//     price: 399000,
//     sizes: ["S", "M", "L", "XL", "XXL"],
//     colors: ["gray", "purple", "green"],
//     images: {
//       gray: "/products/1g.png",
//       purple: "/products/1p.png",
//       green: "/products/1gr.png",
//     },
//     quantity: 1,
//     selectedSize: "M",
//     selectedColor: "gray",
//   },
//   {
//     id: 2,
//     name: "Áo khoác Puma Ultra Warm Zip",
//     shortDescription: "Áo khoác giữ ấm, thiết kế thể thao năng động.",
//     description:
//       "Áo khoác Puma Ultra Warm Zip với lớp lót giữ nhiệt, khóa kéo tiện lợi. Phù hợp với thời tiết se lạnh ở miền Bắc và Đà Lạt.",
//     price: 599000,
//     sizes: ["S", "M", "L", "XL"],
//     colors: ["gray", "green"],
//     images: {
//       gray: "/products/2g.png",
//       green: "/products/2gr.png",
//     },
//     quantity: 2,
//     selectedSize: "L",
//     selectedColor: "green",
//   },
//   {
//     id: 3,
//     name: "Áo hoodie Nike Air Essentials",
//     shortDescription: "Áo hoodie phong cách trẻ trung, giữ ấm tốt.",
//     description:
//       "Nike Air Essentials Pullover là lựa chọn lý tưởng cho mùa đông. Chất liệu dày dặn, form rộng thoải mái, phù hợp với giới trẻ Việt.",
//     price: 699000,
//     sizes: ["S", "M", "L"],
//     colors: ["green", "blue", "black"],
//     images: {
//       green: "/products/3gr.png",
//       blue: "/products/3b.png",
//       black: "/products/3bl.png",
//     },
//     quantity: 1,
//     selectedSize: "S",
//     selectedColor: "blue",
//   },
// ];

const CartPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeStep = parseInt(searchParams.get("step") || "1");
  
  const {cart,removeFromCart} = useCartStore();

  // Tính tổng tiền
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* Title */}
      <h1 className="text-2xl font-medium">Giỏ hàng của bạn</h1>
      {/* steps */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              step.id === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
            key={step.id}
          >
            <div
              className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${
                step.id === activeStep ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>
      {/* step and details */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* steps */}
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8">
          {activeStep === 1 ? (
            cart.map((item) => (
              // singel cart item
              <div className="flex items-center justify-between" key={item.id+item.selectedSize+item.selectedColor}>
                {/* image and details */}
                <div className="flex gap-8">
                  {/* image */}
                  <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                    <Image
                      src={item.images[item.selectedColor]}
                      alt={item.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* item details */}
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-1">
                      <p className="text-sm font-medium">{item.name}</p>
                      <p className="text-xs text-gray-500">Số lượng: {item.quantity}</p>
                      <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
                      <p className="text-xs text-gray-500">Màu sắc: {item.selectedColor}</p>
                    </div>
                    <p className="font-medium">
                      {item.price.toLocaleString("vi-VN")} đ
                    </p>
                  </div>
                </div>
                {/* delete button */}
                <button onClick={()=>removeFromCart(item)} className=" w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer">
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            ))
          ) : activeStep === 2 ? (
            <ShippingForm />
          ) : activeStep === 3 ? (
            <PaymentForm totalAmount={totalAmount} />
          ) : null}
        </div>
        {/* details */}
        <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Chi tiết đơn hàng</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className=" text-gray-500">Tổng cộng:</p>
              <p className="font-medium">
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toLocaleString("vi-VN")}{" "}
                đ
              </p>
            </div>

            <div className="flex justify-between text-sm">
              <p className=" text-gray-500">Giảm giá (10%):</p>
              <p className="font-medium">229.600 đ</p>
            </div>

            <div className="flex justify-between text-sm">
              <p className=" text-gray-500">Phí vận chuyển:</p>
              <p className="font-medium">30.000 đ</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className=" text-gray-800 font-semibold">Tổng thanh toán:</p>
              <p className="font-medium">
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toLocaleString("vi-VN")}{" "}
                đ{" "}
              </p>
            </div>
          </div>
          
          {activeStep === 1 && (
            <button
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-gray-700 hover:bg-gray-900 transition-all duration-300 text-white p-2 cursor-pointer rounded-lg flex items-center justify-center gap-2"
            >
              Tiến hành thanh toán{" "}
              <ArrowRight className="w-3 h-3 relative top-[2px]" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
