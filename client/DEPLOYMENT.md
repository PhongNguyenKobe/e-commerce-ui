# 🚀 HƯỚNG DẪN DEPLOY LÊN PRODUCTION

## 📋 Checklist trước khi deploy

### 1. **Cấu hình Environment Variables**

Tạo file `.env.local` (hoặc `.env.production`) với các biến sau:

```bash
# Base URL của domain production
NEXT_PUBLIC_BASE_URL=https://your-domain.com

# VNPay Configuration
VNPAY_TMN_CODE=YOUR_PRODUCTION_TMN_CODE
VNPAY_HASH_SECRET=YOUR_PRODUCTION_HASH_SECRET
VNPAY_URL=https://pay.vnpay.vn/paymentv2/vpcpay.html
```

**Lưu ý:** 
- Thay `https://your-domain.com` bằng domain thật của bạn
- Không có dấu `/` ở cuối URL
- **TUYỆT ĐỐI KHÔNG** commit file `.env.local` lên GitHub
- Production credentials phải được bảo mật tuyệt đối

### 2. **VNPay Configuration**

#### Development (Sandbox)
- ✅ Đang sử dụng VNPay Sandbox với env variables
- Credentials được lưu trong `.env.local` (gitignored)
- URL: `https://sandbox.vnpayment.vn/paymentv2/vpcpay.html`

#### Production (Thật)
Khi deploy production, bạn cần:
1. **Đăng ký tài khoản VNPay doanh nghiệp** tại: https://vnpay.vn
2. Nhận thông tin production credentials
3. Cập nhật trong file `.env.local` hoặc `.env.production`:

```bash
VNPAY_TMN_CODE=YOUR_PRODUCTION_TMN_CODE
VNPAY_HASH_SECRET=YOUR_PRODUCTION_HASH_SECRET
VNPAY_URL=https://pay.vnpay.vn/paymentv2/vpcpay.html
```

**✅ Đã bảo mật:** Tất cả VNPay credentials đã được chuyển sang environment variables, không còn hardcode trong source code.

### 3. **Deploy với Vercel**

```bash
# Cài Vercel CLI (nếu chưa có)
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy production
vercel --prod
```

**Cấu hình Environment Variables trên Vercel:**
1. Vào project dashboard → Settings → Environment Variables
2. Thêm:
   - `NEXT_PUBLIC_BASE_URL` = `https://your-domain.vercel.app`
   - `VNPAY_TMN_CODE` = Your production TmnCode
   - `VNPAY_HASH_SECRET` = Your production HashSecret
   - `VNPAY_URL` = `https://pay.vnpay.vn/paymentv2/vpcpay.html`

### 4. **Deploy với Netlify**

```bash
# Cài Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Deploy production
netlify deploy --prod
```

### 5. **Deploy với Docker**

```bash
# Build image
docker build -t ecommerce-app .

# Run container với environment variables
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_BASE_URL=https://your-domain.com \
  -e VNPAY_TMN_CODE=YOUR_TMN_CODE \
  -e VNPAY_HASH_SECRET=YOUR_HASH_SECRET \
  -e VNPAY_URL=https://pay.vnpay.vn/paymentv2/vpcpay.html \
  ecommerce-app
```

---

## 🔍 Testing Production

### Test VNPay Integration

1. **Cập nhật Return URL trên VNPay Portal:**
   - Login vào tài khoản VNPay merchant
   - Cấu hình Return URL: `https://your-domain.com/payment-result`

2. **Test thanh toán:**
   - Vào `https://your-domain.com/cart?step=3`
   - Chọn VNPay
   - Thanh toán với thẻ test (hoặc thật nếu production)
   - Kiểm tra redirect về `/payment-result`

### Test Stripe Integration

*Lưu ý: Hiện tại Stripe chỉ là demo UI. Để tích hợp thật, cần:*
1. Đăng ký tài khoản Stripe: https://stripe.com
2. Cài `@stripe/stripe-js` và `@stripe/react-stripe-js`
3. Tạo API route xử lý Stripe Payment Intent
4. Thêm Stripe publishable key vào env

---

## 📝 Environment Variables Summary

| Variable | Development | Production |
|----------|-------------|------------|
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3000` | `https://your-domain.com` |
| `VNPAY_TMN_CODE` | `2B9A0YTY` (sandbox) | Your production code |
| `VNPAY_HASH_SECRET` | Sandbox secret | Your production secret |
| `VNPAY_URL` | Sandbox URL | `https://pay.vnpay.vn/paymentv2/vpcpay.html` |

---

## ⚠️ Lưu ý quan trọng

1. **Không commit file `.env.local`** - đã được gitignore
2. **HashSecret phải được bảo mật tuyệt đối** - đừng hardcode trong code
3. **Test kỹ trên sandbox trước khi chuyển production**
4. **VNPay production cần website đã có SSL (HTTPS)**
5. **Cần business license để đăng ký VNPay thật**

---

## 🆘 Troubleshooting

### Lỗi: VNPay trả về URL có "undefined"
- **Nguyên nhân:** `NEXT_PUBLIC_BASE_URL` chưa được set
- **Giải pháp:** Kiểm tra file `.env.local` và restart dev server

### Lỗi: 404 khi call API `/api/vnpay/create-payment`
- **Nguyên nhân:** Next.js dev server chưa chạy hoặc route sai
- **Giải pháp:** Chạy `pnpm run dev` và kiểm tra folder structure

### Lỗi: VNPay báo "Invalid signature"
- **Nguyên nhân:** HashSecret sai hoặc params không đúng thứ tự
- **Giải pháp:** Kiểm tra lại HashSecret và đảm bảo params được sort

---

**Happy Deploying! 🎉**
