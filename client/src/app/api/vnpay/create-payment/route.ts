import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

// VNPay configuration - Đọc từ environment variables để bảo mật
const VNPAY_CONFIG = {
  tmnCode: process.env.VNPAY_TMN_CODE || "",
  hashSecret: process.env.VNPAY_HASH_SECRET || "",
  url: process.env.VNPAY_URL || "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html",
  // Sử dụng env variable để dễ dàng thay đổi khi deploy production
  returnUrl: (process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000") + "/payment-result",
};

function sortObject(obj: Record<string, string>) {
  const sorted: Record<string, string> = {};
  const keys = Object.keys(obj).sort();
  keys.forEach((key) => {
    sorted[key] = obj[key];
  });
  return sorted;
}

export async function POST(request: NextRequest) {
  try {
    // Kiểm tra VNPay config có đầy đủ không
    if (!VNPAY_CONFIG.tmnCode || !VNPAY_CONFIG.hashSecret) {
      console.error("VNPay configuration is missing!");
      return NextResponse.json(
        { 
          success: false, 
          message: "Cấu hình VNPay chưa đầy đủ. Vui lòng kiểm tra file .env.local" 
        },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { amount, orderInfo, bankCode } = body;

    // Tạo order ID và transaction date
    const date = new Date();
    const createDate =
      date.getFullYear().toString() +
      (date.getMonth() + 1).toString().padStart(2, "0") +
      date.getDate().toString().padStart(2, "0") +
      date.getHours().toString().padStart(2, "0") +
      date.getMinutes().toString().padStart(2, "0") +
      date.getSeconds().toString().padStart(2, "0");

    const orderId = createDate + Math.floor(Math.random() * 10000);

    // Client IP (lấy từ header hoặc default)
    const ipAddr = request.headers.get("x-forwarded-for") || "127.0.0.1";

    // Build VNPay params
    let vnpParams: Record<string, string> = {
      vnp_Version: "2.1.0",
      vnp_Command: "pay",
      vnp_TmnCode: VNPAY_CONFIG.tmnCode,
      vnp_Locale: "vn",
      vnp_CurrCode: "VND",
      vnp_TxnRef: orderId,
      vnp_OrderInfo: orderInfo || `Thanh toan don hang ${orderId}`,
      vnp_OrderType: "other",
      vnp_Amount: (amount * 100).toString(), // VNPay yêu cầu số tiền * 100
      vnp_ReturnUrl: VNPAY_CONFIG.returnUrl,
      vnp_IpAddr: ipAddr,
      vnp_CreateDate: createDate,
    };

    // Thêm bankCode nếu có
    if (bankCode) {
      vnpParams.vnp_BankCode = bankCode;
    }

    // Sort params
    vnpParams = sortObject(vnpParams);

    // Tạo query string
    const signData = new URLSearchParams(vnpParams).toString();

    // Tạo secure hash
    const hmac = crypto.createHmac("sha512", VNPAY_CONFIG.hashSecret);
    const signed = hmac.update(Buffer.from(signData, "utf-8")).digest("hex");

    vnpParams.vnp_SecureHash = signed;

    // Build final URL
    const paymentUrl = VNPAY_CONFIG.url + "?" + new URLSearchParams(vnpParams).toString();

    return NextResponse.json({
      success: true,
      paymentUrl,
      orderId,
    });
  } catch (error) {
    console.error("VNPay error:", error);
    return NextResponse.json(
      { success: false, message: "Có lỗi xảy ra khi tạo link thanh toán" },
      { status: 500 }
    );
  }
}
