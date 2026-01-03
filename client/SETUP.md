# 🚀 Quick Setup Guide

## Bước 1: Clone repository

```bash
git clone https://github.com/PhongNguyenKobe/e-commerce-ui.git
cd e-commerce-ui/client
```

## Bước 2: Cài đặt dependencies

```bash
pnpm install
# hoặc
npm install
```

## Bước 3: Setup Environment Variables

Copy file `.env.example` thành `.env.local`:

```bash
# Windows PowerShell
Copy-Item .env.example .env.local

# Linux/Mac
cp .env.example .env.local
```

File `.env.local` sẽ có nội dung mặc định cho sandbox:

```bash
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_ADMIN_URL=http://localhost:3001
VNPAY_TMN_CODE=<your_sandbox_tmncode>
VNPAY_HASH_SECRET=<your_sandbox_secret>
VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
```

⚠️ Để nhận sandbox credentials, vui lòng đăng ký tại https://sandbox.vnpayment.vn

## Bước 4: Chạy development server

```bash
pnpm run dev
# hoặc
npm run dev
```

Mở trình duyệt tại: http://localhost:3000

## Bước 5: Test Payment Flow

1. Vào giỏ hàng: http://localhost:3000/cart
2. Click "Tiến hành thanh toán"
3. Điền thông tin shipping (Step 2)
4. Chọn phương thức thanh toán (Step 3):
   - **VNPay**: Chọn ngân hàng → Redirect sang VNPay sandbox
   - **Stripe**: Nhập thông tin thẻ → Demo success page

---

## 📦 Project Structure

```
client/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── vnpay/
│   │   │       └── create-payment/
│   │   │           └── route.ts          # VNPay API endpoint
│   │   ├── cart/
│   │   │   └── page.tsx                  # Cart & Checkout page
│   │   ├── payment-result/
│   │   │   └── page.tsx                  # VNPay callback page
│   │   └── payment-success/
│   │       └── page.tsx                  # Stripe success page
│   ├── components/
│   │   ├── PaymentForm.tsx               # Payment form (VNPay + Stripe)
│   │   ├── ShippingForm.tsx              # Shipping info form
│   │   └── ...
│   └── types.ts                          # TypeScript types & schemas
├── .env.local                            # Environment variables (gitignored)
├── .env.example                          # Template for env vars
├── DEPLOYMENT.md                         # Deploy instructions
└── SECURITY.md                           # Security guidelines
```

---

## 🔐 Security Notes

- ✅ File `.env.local` đã được gitignore
- ✅ Credentials được quản lý qua environment variables
- ✅ Sandbox credentials an toàn để dev
- ❌ KHÔNG commit `.env.local` lên GitHub
- ❌ KHÔNG hardcode production secrets

Đọc thêm: [SECURITY.md](./SECURITY.md)

---

## 🚀 Deploy to Production

Đọc hướng dẫn chi tiết: [DEPLOYMENT.md](./DEPLOYMENT.md)

**Quick checklist:**
1. Đăng ký VNPay production account
2. Update environment variables
3. Deploy lên Vercel/Netlify
4. Test thanh toán thật

---

## 📚 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Forms:** react-hook-form + zod
- **Payment:** VNPay, Stripe (demo)
- **Icons:** Lucide React

---

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

---

## 📝 License

MIT

---

**Happy Coding! 💻**
