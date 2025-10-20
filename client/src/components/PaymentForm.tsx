"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentFormSchema, PaymentFormInputs } from "@/types";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";

type Props = {
  setPaymentForm?: (data: PaymentFormInputs) => void;
  totalAmount?: number; // Tổng tiền đơn hàng
};

const PaymentForm = ({ setPaymentForm, totalAmount = 1597000 }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PaymentFormInputs>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      paymentMethod: "vnpay",
    },
  });

  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const selectedMethod = watch("paymentMethod");

  const onSubmit = (data: PaymentFormInputs) => {
    if (setPaymentForm) {
      setPaymentForm(data);
    } else {
      console.log("Thông tin thanh toán:", data);
    }
  };

  const handlePaymentForm: SubmitHandler<PaymentFormInputs> = async (data) => {
    onSubmit(data);
    setIsProcessing(true);

    try {
      if (data.paymentMethod === "vnpay") {
        // Gọi API để tạo VNPay payment URL
        const response = await fetch("/api/vnpay/create-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: totalAmount,
            orderInfo: `Thanh toan don hang`,
            bankCode: data.bankCode || "",
          }),
        });

        const result = await response.json();

        if (result.success && result.paymentUrl) {
          // Redirect đến VNPay
          window.location.href = result.paymentUrl;
        } else {
          alert("Có lỗi xảy ra khi tạo link thanh toán VNPay");
          setIsProcessing(false);
        }
      } else {
        // Stripe payment - chỉ demo, chuyển sang trang success
        router.push("/payment-success");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Có lỗi xảy ra khi xử lý thanh toán");
      setIsProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handlePaymentForm)}
      className="flex flex-col gap-6"
    >
      {/* Chọn phương thức thanh toán */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-gray-700">
          Chọn phương thức thanh toán
        </label>

        {/* VNPay Option */}
        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
          <input
            type="radio"
            value="vnpay"
            {...register("paymentMethod")}
            className="w-4 h-4"
          />
          <Image
            src="/vnpay.png"
            alt="VNPay"
            width={80}
            height={30}
            className="object-contain"
          />
          <span className="text-sm font-medium">
            VNPay (ATM/Visa/Master/QR)
          </span>
        </label>

        {/* Stripe Option */}
        <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
          <input
            type="radio"
            value="stripe"
            {...register("paymentMethod")}
            className="w-4 h-4"
          />
          <div className="flex items-center gap-2">
            <Image
              src="/klarna.png"
              alt="Cards"
              width={60}
              height={25}
              className="object-contain"
            />

            <Image
              src="/cards.png"
              alt="Cards"
              width={60}
              height={25}
              className="object-contain"
            />

            <Image
              src="/stripe.png"
              alt="Stripe"
              width={60}
              height={25}
              className="object-contain"
            />
          </div>
          <span className="text-sm font-medium">Thẻ quốc tế (Stripe)</span>
        </label>

        {errors.paymentMethod && (
          <p className="text-xs text-red-500">{errors.paymentMethod.message}</p>
        )}
      </div>

      {/* VNPay Bank Selection */}
      {selectedMethod === "vnpay" && (
        <div className="flex flex-col gap-2 p-4 bg-blue-50 rounded-lg">
          <label
            htmlFor="bankCode"
            className="text-xs text-gray-600 font-medium"
          >
            Chọn ngân hàng (tùy chọn)
          </label>
          <select
            id="bankCode"
            {...register("bankCode")}
            className="border border-gray-300 rounded-md p-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="">-- Chọn ngân hàng --</option>
            <option value="VNPAYQR">VNPay QR</option>
            <option value="VNBANK">Ngân hàng nội địa</option>
            <option value="INTCARD">Thẻ quốc tế</option>
            <option value="VIETCOMBANK">Vietcombank</option>
            <option value="VIETINBANK">VietinBank</option>
            <option value="BIDV">BIDV</option>
            <option value="AGRIBANK">Agribank</option>
            <option value="TECHCOMBANK">Techcombank</option>
            <option value="ACB">ACB</option>
            <option value="MB">MB Bank</option>
            <option value="SACOMBANK">Sacombank</option>
            <option value="TPB">TPBank</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            * Bạn sẽ được chuyển đến trang thanh toán VNPay
          </p>
        </div>
      )}

      {/* Stripe Card Fields */}
      {selectedMethod === "stripe" && (
        <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg">
          {/* Tên chủ thẻ */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="cardHolder"
              className="text-xs text-gray-500 font-medium"
            >
              Tên chủ thẻ
            </label>
            <input
              id="cardHolder"
              type="text"
              placeholder="ví dụ: NGUYEN VAN A"
              {...register("cardHolder")}
              className={`border-b py-2 outline-none text-sm bg-transparent ${
                errors.cardHolder ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cardHolder && (
              <p className="text-xs text-red-500">
                {errors.cardHolder.message}
              </p>
            )}
          </div>

          {/* Số thẻ */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="cardNumber"
              className="text-xs text-gray-500 font-medium"
            >
              Số thẻ
            </label>
            <input
              id="cardNumber"
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength={16}
              {...register("cardNumber")}
              className={`border-b py-2 outline-none text-sm bg-transparent ${
                errors.cardNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.cardNumber && (
              <p className="text-xs text-red-500">
                {errors.cardNumber.message}
              </p>
            )}
          </div>

          {/* Ngày hết hạn và CVV */}
          <div className="flex gap-4">
            <div className="flex flex-col gap-1 flex-1">
              <label
                htmlFor="expirationDate"
                className="text-xs text-gray-500 font-medium"
              >
                Ngày hết hạn
              </label>
              <input
                id="expirationDate"
                type="text"
                placeholder="MM/YY"
                maxLength={5}
                {...register("expirationDate")}
                className={`border-b py-2 outline-none text-sm bg-transparent ${
                  errors.expirationDate ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.expirationDate && (
                <p className="text-xs text-red-500">
                  {errors.expirationDate.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 flex-1">
              <label
                htmlFor="cvv"
                className="text-xs text-gray-500 font-medium"
              >
                Mã CVV
              </label>
              <input
                id="cvv"
                type="password"
                placeholder="123"
                maxLength={3}
                {...register("cvv")}
                className={`border-b py-2 outline-none text-sm bg-transparent ${
                  errors.cvv ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.cvv && (
                <p className="text-xs text-red-500">{errors.cvv.message}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Nút thanh toán */}
      <button
        type="submit"
        disabled={isProcessing}
        className="w-full bg-gray-700 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-300 text-white p-3 cursor-pointer rounded-lg flex items-center justify-center gap-2 font-medium"
      >
        {isProcessing ? (
          "Đang xử lý..."
        ) : (
          <>
            Xác nhận thanh toán <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};

export default PaymentForm;
