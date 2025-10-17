"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle } from "lucide-react";
import { Suspense } from "react";

function PaymentResultContent() {
  const searchParams = useSearchParams();

  // VNPay trả về các params: vnp_ResponseCode, vnp_TxnRef, vnp_Amount, vnp_BankCode, etc.
  const responseCode = searchParams.get("vnp_ResponseCode");
  const txnRef = searchParams.get("vnp_TxnRef");
  const amount = searchParams.get("vnp_Amount");
  const bankCode = searchParams.get("vnp_BankCode");
  const transactionNo = searchParams.get("vnp_TransactionNo");

  const isSuccess = responseCode === "00";

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col items-center gap-4">
          {isSuccess ? (
            <>
              <CheckCircle className="w-20 h-20 text-green-500" />
              <h1 className="text-2xl font-bold text-gray-800">
                Thanh toán thành công!
              </h1>
              <p className="text-gray-600 text-center">
                Đơn hàng của bạn đã được thanh toán thành công qua VNPay.
              </p>
            </>
          ) : (
            <>
              <XCircle className="w-20 h-20 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-800">
                Thanh toán thất bại
              </h1>
              <p className="text-gray-600 text-center">
                Giao dịch không thành công. Vui lòng thử lại.
              </p>
            </>
          )}

          {/* Thông tin giao dịch */}
          <div className="w-full mt-4 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-sm text-gray-700 mb-2">
              Thông tin giao dịch
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              {txnRef && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã đơn hàng:</span>
                  <span className="font-medium">{txnRef}</span>
                </div>
              )}
              {amount && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Số tiền:</span>
                  <span className="font-medium">
                    {(parseInt(amount) / 100).toLocaleString("vi-VN")} đ
                  </span>
                </div>
              )}
              {bankCode && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Ngân hàng:</span>
                  <span className="font-medium">{bankCode}</span>
                </div>
              )}
              {transactionNo && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã giao dịch:</span>
                  <span className="font-medium">{transactionNo}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Trạng thái:</span>
                <span
                  className={`font-medium ${
                    isSuccess ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {isSuccess ? "Thành công" : "Thất bại"}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-3 mt-4">
            <Link
              href="/"
              className="w-full bg-gray-700 hover:bg-gray-900 transition-all duration-300 text-white p-3 rounded-lg text-center font-medium"
            >
              Quay về trang chủ
            </Link>
            {!isSuccess && (
              <Link
                href="/cart?step=3"
                className="w-full border border-gray-300 hover:bg-gray-50 transition-all duration-300 text-gray-700 p-3 rounded-lg text-center font-medium"
              >
                Thử lại thanh toán
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Đang tải...</div>}>
      <PaymentResultContent />
    </Suspense>
  );
}
