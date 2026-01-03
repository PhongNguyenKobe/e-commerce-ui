# 🚀 HƯỚNG DẪN DEPLOY LÊN VERCEL

## 📋 Chuẩn bị trước deploy

### 1. **Requirements**
- Tài khoản GitHub/GitLab/Bitbucket với code push
- Tài khoản Vercel (đăng ký miễn phí tại [vercel.com](https://vercel.com))
- CLI Vercel đã cài đặt (tuỳ chọn)

### 2. **Cấu trúc Monorepo**
Dự án của bạn có 2 Next.js apps riêng biệt:
- **`/client`** - Ứng dụng khách hàng (trang chính)
- **`/admin`** - Ứng dụng quản trị viên (dashboard)

---

## 🔧 Phương pháp Deploy

### **Phương pháp 1: Deploy lên 2 Projects riêng biệt (Khuyến nghị)**

Đây là cách tốt nhất cho monorepo với Vercel.

#### Bước 1: Tạo 2 Repository riêng
Để quản lý dễ dàng hơn, bạn có thể tách thành 2 repos:

```bash
# Clone lại monorepo
git clone <your-monorepo-url>
cd E-COMMERCE-UI

# Tạo repo cho client
mkdir ../ecommerce-client-temp
cd ../ecommerce-client-temp
git init
cp -r ../E-COMMERCE-UI/client/* .
git add .
git commit -m "Initial commit - client app"
git remote add origin <new-client-repo-url>
git push -u origin main

# Tạo repo cho admin
mkdir ../ecommerce-admin-temp
cd ../ecommerce-admin-temp
git init
cp -r ../E-COMMERCE-UI/admin/* .
git add .
git commit -m "Initial commit - admin app"
git remote add origin <new-admin-repo-url>
git push -u origin main
```

#### Bước 2: Deploy Client trên Vercel

1. Vào [vercel.com/new](https://vercel.com/new)
2. Chọn "Import Git Repository"
3. Chọn repo `ecommerce-client-temp`
4. Cấu hình Project:
   - **Project Name**: `ecommerce-client`
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./` (hoặc để trống)
   - **Environment Variables**:
     ```
     NEXT_PUBLIC_BASE_URL=https://ecommerce-client-<hash>.vercel.app
     VNPAY_TMN_CODE=<your-vnpay-code>
     VNPAY_HASH_SECRET=<your-vnpay-secret>
     VNPAY_URL=https://pay.vnpay.vn/paymentv2/vpcpay.html
     ```
5. Bấm "Deploy"

#### Bước 3: Deploy Admin trên Vercel

1. Vào [vercel.com/new](https://vercel.com/new)
2. Chọn "Import Git Repository"
3. Chọn repo `ecommerce-admin-temp`
4. Cấu hình Project:
   - **Project Name**: `ecommerce-admin`
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./`
   - **Environment Variables**: (nếu cần)
5. Bấm "Deploy"

---

### **Phương pháp 2: Deploy từ Monorepo (Nâng cao)**

Nếu muốn giữ monorepo trên GitHub, dùng `vercel.json`:

#### Bước 1: Cấu hình vercel.json (đã được tạo)
Files `vercel.json` đã được tạo tại:
- `/vercel.json` (root)
- `/client/vercel.json`
- `/admin/vercel.json`

#### Bước 2: Deploy Client
1. Vào [vercel.com/new](https://vercel.com/new)
2. Import monorepo repository
3. Cấu hình:
   - **Project Name**: `ecommerce-client`
   - **Root Directory**: `client` ⚠️ **QUAN TRỌNG**
   - **Environment Variables**: (xem phía trên)
4. Deploy

#### Bước 3: Deploy Admin
Lặp lại bước 2 nhưng:
   - **Project Name**: `ecommerce-admin`
   - **Root Directory**: `admin`

---

## 🔐 Cấu hình Environment Variables

### Cho Client (BẮTBUỘC)
```env
# Đây là URL của app client trên Vercel
NEXT_PUBLIC_BASE_URL=https://ecommerce-client-xyz.vercel.app

# VNPay Production Credentials
VNPAY_TMN_CODE=<Get from VNPay dashboard>
VNPAY_HASH_SECRET=<Get from VNPay dashboard>
VNPAY_URL=https://pay.vnpay.vn/paymentv2/vpcpay.html
```

### Cho Admin (Tuỳ chọn)
Nếu admin cần kết nối API, thêm:
```env
NEXT_PUBLIC_API_URL=https://ecommerce-client-xyz.vercel.app/api
```

---

## 🔗 Liên kết Client → Admin

**✅ Đã thêm vào Navbar** ở `/client/src/components/Navbar.tsx`

Có icon ⚙️ (Settings) ở navbar:
- Khi ấn sẽ chuyển tới `/admin`
- Trong production: `https://ecommerce-admin-xyz.vercel.app`

---

## 🚀 Deploy qua CLI (Tuỳ chọn)

Nếu cài Vercel CLI:

```bash
# Cài CLI
npm i -g vercel

# Login
vercel login

# Deploy client
cd client
vercel --prod

# Deploy admin
cd ../admin
vercel --prod
```

---

## ✅ Kiểm tra sau Deploy

1. ✔️ Client load đúng tại `https://ecommerce-client-xyz.vercel.app`
2. ✔️ Admin load đúng tại `https://ecommerce-admin-xyz.vercel.app`
3. ✔️ Có thể click icon Settings ở navbar client để vào admin
4. ✔️ VNPay payment flow hoạt động (nếu có)

---

## 🐛 Troubleshooting

### Build fails
- Kiểm tra `package.json` scripts: `build` phải tồn tại
- Xóa `.next` folder và deploy lại
- Xem Vercel logs chi tiết

### Env variables không có
- Đảm bảo thêm vào Settings → Environment Variables trên Vercel
- Rebuild project (`Deployments` → `...` → `Redeploy`)

### Admin page không tải
- Kiểm tra URL của admin project
- Cập nhật link trong Navbar nếu cần

---

## 📞 Hỗ trợ

Tham khảo:
- [Vercel Docs](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel Monorepo Guide](https://vercel.com/guides/monorepos)
