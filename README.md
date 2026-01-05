# E-Commerce UI Platform

![Next.js](https://img.shields.io/badge/Next.js-16.1-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-blue)
![Node.js](https://img.shields.io/badge/Node.js-Required-green)

Một nền tảng thương mại điện tử hiện đại được xây dựng bằng **Next.js 16**, **React 19**, và **TypeScript**, bao gồm ứng dụng khách hàng và hệ thống quản lý quản trị viên toàn bộ.

## 📋 Mục lục

- [Giới thiệu](#giới-thiệu)
- [Kiến trúc dự án](#kiến-trúc-dự-án)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Hướng dẫn cài đặt](#hướng-dẫn-cài-đặt)
- [Hướng dẫn sử dụng](#hướng-dẫn-sử-dụng)
- [Tính năng chính](#tính-năng-chính)
- [Biến môi trường](#biến-môi-trường)
- [Đóng góp](#đóng-góp)

---

## 🎯 Giới thiệu

**E-Commerce UI Platform** là một giải pháp thương mại điện tử hoàn chỉnh với hai ứng dụng chính:

1. **Client** - Ứng dụng khách hàng: Duyệt sản phẩm, thêm vào giỏ hàng, thanh toán bằng VNPay
2. **Admin** - Hệ thống quản lý: Quản lý sản phẩm, đơn hàng, người dùng, danh mục, và xem các thống kê chi tiết

Dự án được phát triển bằng những công nghệ hiện đại nhất của React và Next.js, cung cấp hiệu suất cao, UX tuyệt vời và dễ bảo trì.

---

## 🏗️ Kiến trúc dự án

```
E-COMMERCE-UI/
├── admin/          # Hệ thống quản lý (Admin Dashboard)
└── client/         # Ứng dụng khách hàng (Customer Portal)
```

### Admin Dashboard
Ứng dụng quản lý đầy đủ với các chức năng:
- 📊 Dashboard với thống kê và biểu đồ
- 📦 Quản lý sản phẩm (tạo, chỉnh sửa, xóa)
- 👥 Quản lý người dùng
- 🛍️ Quản lý đơn hàng
- 💳 Quản lý thanh toán
- 📂 Quản lý danh mục sản phẩm
- 📈 Phân tích dữ liệu bằng biểu đồ

### Client Application
Ứng dụng khách hàng với trải nghiệm mua sắm:
- 🛒 Duyệt danh sách sản phẩm
- 🔍 Tìm kiếm và lọc sản phẩm
- 💳 Giỏ hàng với quản lý số lượng
- 📦 Thông tin chi tiết sản phẩm
- 💰 Thanh toán qua VNPay
- 📍 Quản lý địa chỉ giao hàng (theo tỉnh/thành phố)
-  Trang kết quả thanh toán

---

## 🛠️ Công nghệ sử dụng

### Frontend Framework
- **Next.js 16** - React framework với SSR/SSG
- **React 19** - UI library
- **TypeScript** - Type safety

### Styling & UI
- **Tailwind CSS 4** - Utility-first CSS framework
- **Shadcn/ui** - High-quality React components
- **Radix UI** - Primitive components (Dialog, Select, Dropdown, etc.)
- **Lucide React** - Icon library
- **Recharts** - Data visualization library

### State Management & Forms
- **Zustand** - Lightweight state management (Client)
- **React Hook Form** - Efficient form handling
- **Zod** - TypeScript-first schema validation

### Payment Integration
- **VNPay** - Vietnamese payment gateway integration

### Other Tools
- **Date-fns** - Date manipulation
- **React-day-picker** - Calendar component
- **React-toastify** - Toast notifications
- **ESLint** - Code quality
- **pnpm** - Package manager

---

## 📂 Cấu trúc thư mục

### Admin Project

```
admin/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── payments/            # Payment management pages
│   │   ├── products/            # Product management pages
│   │   └── users/               # User management pages
│   ├── components/
│   │   ├── AddProduct.tsx        # Add product form
│   │   ├── AddUser.tsx           # Add user form
│   │   ├── AddCategory.tsx       # Add category form
│   │   ├── AddOrder.tsx          # Add order form
│   │   ├── EditUser.tsx          # Edit user form
│   │   ├── AppSidebar.tsx        # Navigation sidebar
│   │   ├── Navbar.tsx            # Top navigation
│   │   ├── CardList.tsx          # Statistics cards
│   │   ├── TablePagination.tsx   # Pagination component
│   │   ├── TodoList.tsx          # Task list component
│   │   ├── AppLineChart.tsx      # Line chart
│   │   ├── AppBarChart.tsx       # Bar chart
│   │   ├── AppAreaChart.tsx      # Area chart
│   │   ├── AppPieChart.tsx       # Pie chart
│   │   ├── providers/            # Context providers
│   │   └── ui/                   # UI components library
│   ├── hooks/
│   │   └── use-mobile.ts         # Mobile detection hook
│   └── lib/
│       └── utils.ts              # Utility functions
├── public/
│   ├── products/                 # Product images
│   └── users/                    # User images
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

### Client Project

```
client/
├── src/
│   ├── app/
│   │   ├── globals.css           # Global styles
│   │   ├── layout.tsx            # Root layout
│   │   ├── page.tsx              # Homepage
│   │   ├── api/
│   │   │   └── vnpay/
│   │   │       └── create-payment/   # VNPay payment API
│   │   ├── cart/                 # Shopping cart pages
│   │   ├── payment-result/       # Payment result pages
│   │   ├── payment-success/      # Payment success pages
│   │   └── products/             # Product pages
│   ├── components/
│   │   ├── Navbar.tsx            # Navigation bar
│   │   ├── Footer.tsx            # Footer
│   │   ├── ProductList.tsx       # Product list
│   │   ├── ProductCard.tsx       # Product card component
│   │   ├── ProductInteraction.tsx # Product interaction
│   │   ├── Categories.tsx        # Category filter
│   │   ├── Filter.tsx            # Product filter
│   │   ├── SearchBar.tsx         # Search functionality
│   │   ├── ShoppingCartIcon.tsx  # Cart icon with badge
│   │   ├── PaymentForm.tsx       # Payment form
│   │   └── ShippingForm.tsx      # Shipping information form
│   ├── stores/
│   │   └── cardStore.ts          # Cart state management (Zustand)
│   └── types.ts                  # TypeScript type definitions
├── public/
│   ├── data/
│   │   └── provinces.json        # Vietnamese provinces data
│   └── products/                 # Product images
├── package.json
├── tsconfig.json
├── next.config.ts
├── .env.example
├── .env.local
├── README.md
└── SETUP.md
```

---

## 🚀 Hướng dẫn cài đặt

### Yêu cầu
- **Node.js** 18.17+ 
- **pnpm** 8.0+ (hoặc npm/yarn)
- **Git**

### Bước 1: Clone repository

```bash
git clone https://github.com/PhongNguyenKobe/e-commerce-ui.git
cd E-COMMERCE-UI
```

### Bước 2: Cài đặt Admin Dashboard

```bash
cd admin
pnpm install
# hoặc: npm install

# Chạy development server
pnpm dev

# Admin sẽ chạy ở http://localhost:3000
```

### Bước 3: Cài đặt Client Application

```bash
cd ../client

# Copy file environment
cp .env.example .env.local

# Cài đặt dependencies
pnpm install
# hoặc: npm install

# Chạy development server
pnpm dev

# Client sẽ chạy ở http://localhost:3001 (hoặc port khác nếu 3000 đang sử dụng)
```

### Bước 4: Cấu hình VNPay (cho Client)

Cập nhật file `.env.local` trong thư mục `client/`:

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3001
VNPAY_TMN_CODE=your_tmn_code
VNPAY_HASH_SECRET=your_hash_secret
VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html
```

---

## 💻 Hướng dẫn sử dụng

### Chạy cả hai ứng dụng cùng lúc

**Cách 1: Sử dụng hai terminal**

Terminal 1 - Admin:
```bash
cd admin
pnpm dev
```

Terminal 2 - Client:
```bash
cd client
pnpm dev
```

**Cách 2: Sử dụng concurrently (tùy chọn)**

Từ root directory:
```bash
pnpm install -D concurrently
pnpm add -D -w concurrently

# Tạo script trong root package.json
"dev": "concurrently \"cd admin && pnpm dev\" \"cd client && pnpm dev\""
```

### Build cho Production

Admin:
```bash
cd admin
pnpm build
pnpm start
```

Client:
```bash
cd client
pnpm build
pnpm start
```

---

## ✨ Tính năng chính

### 🛒 Client Application (Khách hàng)

#### Quản lý sản phẩm
-  Hiển thị danh sách sản phẩm với hình ảnh, giá, và mô tả
-  Chi tiết sản phẩm đầy đủ
-  Lựa chọn kích cỡ (size) và màu sắc
-  Tìm kiếm sản phẩm theo tên
-  Lọc theo danh mục
-  Lọc theo giá, rating, v.v.

#### Giỏ hàng
-  Thêm/xóa sản phẩm
-  Thay đổi số lượng
-  Lưu giỏ hàng vào localStorage
-  Tính tổng giá tự động
-  Hiển thị số lượng sản phẩm trên icon

#### Thanh toán
-  Hỗ trợ thanh toán qua **VNPay**
-  Form thông tin giao hàng
-  Chọn địa chỉ theo tỉnh/thành phố (dữ liệu từ provinces.json)
-  Xác nhận thanh toán
-  Trang kết quả thanh toán với trạng thái

#### Giao diện
-  Navbar với logo, menu, tìm kiếm, cart icon
-  Footer với thông tin liên hệ
-  Responsive design (Mobile, Tablet, Desktop)
-  Dark/Light mode support

---

### 📊 Admin Dashboard (Quản lý)

#### Dashboard & Thống kê
-  Trang chủ với overview
-  Thẻ thống kê (Cards) hiển thị metrics chính
-  Biểu đồ dữ liệu:
  - 📈 **Line Chart** - Doanh số theo thời gian
  - 📊 **Bar Chart** - So sánh dữ liệu
  - 📐 **Area Chart** - Xu hướng dữ liệu
  - 🥧 **Pie Chart** - Phân bổ dữ liệu

#### Quản lý Sản phẩm
-  Danh sách sản phẩm với pagination
-  Tạo sản phẩm mới (form validation)
-  Chỉnh sửa sản phẩm
-  Xóa sản phẩm
-  Upload hình ảnh
-  Quản lý giá, mô tả, danh mục

#### Quản lý Người dùng
-  Danh sách người dùng với pagination
-  Thêm người dùng mới
-  Chỉnh sửa thông tin người dùng
-  Xóa người dùng
-  Hiển thị avatar người dùng
-  Quản lý email, điện thoại

#### Quản lý Đơn hàng
-  Danh sách đơn hàng
-  Xem chi tiết đơn hàng
-  Cập nhật trạng thái đơn hàng
-  Theo dõi thanh toán
-  Xóa đơn hàng (nếu cần)

#### Quản lý Thanh toán
-  Danh sách giao dịch thanh toán
-  Chi tiết thanh toán VNPay
-  Trạng thái thanh toán
-  Lịch sử giao dịch

#### Quản lý Danh mục
-  Tạo danh mục sản phẩm
-  Chỉnh sửa danh mục
-  Xóa danh mục
-  Phân loại sản phẩm

#### Giao diện
-  Sidebar navigation
-  Top navbar với profile
-  Data tables với sorting, filtering, pagination
-  Forms với validation
-  Dark/Light mode support
-  Toast notifications
-  Responsive design

---

## 🔐 Biến môi trường

### Client (.env.local)

```env
# Base URL của ứng dụng
NEXT_PUBLIC_BASE_URL=http://localhost:3001

# VNPay Configuration
VNPAY_TMN_CODE=your_vnpay_merchant_code
VNPAY_HASH_SECRET=your_vnpay_hash_secret
VNPAY_URL=https://sandbox.vnpayment.vn/paymentv2/vpcpay.html

# API Configuration (nếu có backend)
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

### Admin (.env.local)

```env
# Admin cấu hình tùy chọn (nếu có backend)
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

---

## 📦 Dependencies Chính

### Frontend Libraries
```
next@16.1.1              - React framework
react@19                 - UI library
typescript@5             - Type safety
tailwindcss@4            - CSS framework
zod@3.24.2              - Schema validation
react-hook-form@7.55    - Form handling
zustand@5.0.8           - State management (Client)
recharts@2.15.2         - Charts & graphs
lucide-react@0.488      - Icons
```

### UI Components
```
@radix-ui/*              - Primitive components
shadcn/ui components    - High-level components
react-day-picker       - Calendar component
```

---

## 📖 Tài liệu thêm

- [Admin SETUP.md](./admin/SETUP.md) - Hướng dẫn chi tiết cho Admin
- [Client SETUP.md](./client/SETUP.md) - Hướng dẫn chi tiết cho Client
- [Client DEPLOYMENT.md](./client/DEPLOYMENT.md) - Hướng dẫn deploy
- [Client SECURITY.md](./client/SECURITY.md) - Bảo mật ứng dụng
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Shadcn/ui Documentation](https://ui.shadcn.com/)

---

## 🚀 Deployment

### Deploy Admin & Client lên Vercel

Admin:
```bash
cd admin
# Kết nối Vercel
vercel link
# Deploy
vercel deploy --prod
```

Client:
```bash
cd client
# Đảm bảo có .env.local với các biến production
vercel link
# Deploy
vercel deploy --prod
```

Hoặc sử dụng GitHub Actions, Docker, Netlify, v.v. tùy theo nhu cầu.

---

## 🤝 Đóng góp

Chúng tôi chào đón các đóng góp! Để đóng góp:

1. Fork project
2. Tạo branch feature (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push lên branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request

---

## 📄 License

Project này được cấp phép theo MIT License - xem file [LICENSE](LICENSE) để chi tiết.

---

## 👥 Tác giả

Được phát triển bởi team E-Commerce Development Team.

---

## 💬 Hỗ trợ

Nếu bạn gặp vấn đề:

1. Kiểm tra tài liệu README trong mỗi folder
2. Xem issues trên GitHub
3. Tạo issue mới với chi tiết mô tả
4. Liên hệ qua email hoặc Discord

---

## 🗺️ Roadmap

- [ ] Backend API integration
- [ ] Authentication system
- [ ] Order tracking
- [ ] User reviews & ratings
- [ ] Wishlists
- [ ] Multi-language support
- [ ] Advanced analytics
- [ ] Inventory management
- [ ] Email notifications
- [ ] SMS notifications

---

**Happy Coding! 🚀**

Last Updated: January 2026
