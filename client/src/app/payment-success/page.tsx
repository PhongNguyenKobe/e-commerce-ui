"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col items-center gap-4">
          <CheckCircle className="w-20 h-20 text-green-500" />
          <h1 className="text-2xl font-bold text-gray-800">
            Thanh toán thành công!
          </h1>
          <p className="text-gray-600 text-center">
            Đơn hàng của bạn đã được xử lý thành công qua Stripe.
          </p>

          <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-sm text-gray-700 mb-2">
              Thông tin đơn hàng
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Phương thức:</span>
                <span className="font-medium">Stripe</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Trạng thái:</span>
                <span className="font-medium text-green-600">Thành công</span>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col gap-3 mt-4">
            <Link
              href="/"
              className="w-full bg-gray-700 hover:bg-gray-900 transition-all duration-300 text-white p-3 rounded-lg text-center font-medium"
            >
              Quay về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
