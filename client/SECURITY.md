# 🔒 SECURITY GUIDELINES

## ⚠️ QUAN TRỌNG: Không commit thông tin nhạy cảm

### Files KHÔNG BAO GIỜ được push lên GitHub:

```
❌ .env.local           # Chứa credentials thật
❌ .env.production      # Chứa production secrets
❌ .env.development     # Có thể chứa API keys
```

### Files AN TOÀN để push lên GitHub:

```
✅ .env.example         # Chỉ chứa template, không có giá trị thật
✅ .gitignore           # Đã config ignore .env*
```

---

## 🔐 VNPay Credentials Security

### Sandbox Credentials (Development)
Credentials sandbox sử dụng cho môi trường test:
- Lấy từ tài liệu VNPay hoặc đăng ký tài khoản sandbox
- `VNPAY_URL`: https://sandbox.vnpayment.vn/paymentv2/vpcpay.html

**Lưu ý:** Sandbox credentials chỉ hoạt động trên môi trường test, không thể dùng cho giao dịch thật.

### Production Credentials (PHẢI BẢO MẬT)
**TUYỆT ĐỐI KHÔNG** commit các thông tin sau lên GitHub:
- ❌ Production TmnCode
- ❌ Production HashSecret  
- ❌ Production API keys
- ❌ Database passwords
- ❌ JWT secrets

---

## 🛡️ Best Practices

### 1. Environment Variables Setup

**Development (Local):**
```bash
# File: .env.local (được gitignore)
# Copy từ .env.example và điền giá trị thật
VNPAY_TMN_CODE=your_sandbox_tmn_code
VNPAY_HASH_SECRET=your_sandbox_hash_secret
```

**Production (Server/Hosting):**
- Vercel: Settings → Environment Variables
- Netlify: Site settings → Environment variables
- Docker: Pass via `-e` flag hoặc docker-compose

### 2. Kiểm tra trước khi commit

```bash
# Kiểm tra file nào sẽ được commit
git status

# Đảm bảo không có .env.local
git ls-files | grep .env

# Nếu đã commit nhầm, xóa khỏi history:
git rm --cached .env.local
```

### 3. Rotate secrets định kỳ

Khi production, nên thay đổi secrets định kỳ:
- HashSecret mỗi 3-6 tháng
- API keys khi có nghi ngờ bị lộ
- Database passwords theo policy công ty

---

## 🚨 Nếu đã commit nhầm credentials

### Bước 1: Xóa file khỏi Git history
```bash
# Xóa file khỏi history (cẩn thận!)
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local" \
  --prune-empty --tag-name-filter cat -- --all

# Hoặc dùng git-filter-repo (recommended)
git filter-repo --path .env.local --invert-paths
```

### Bước 2: Force push
```bash
git push origin --force --all
git push origin --force --tags
```

### Bước 3: Rotate tất cả secrets
- Thay đổi HashSecret ngay lập tức
- Generate API keys mới
- Cập nhật trên server production

### Bước 4: Notify team
- Thông báo cho team về incident
- Cập nhật secrets mới cho mọi người

---

## ✅ Checklist trước khi push lên GitHub

- [ ] `.env.local` đã được gitignore
- [ ] Không có hardcoded credentials trong code
- [ ] Đã test với env variables
- [ ] `.env.example` chỉ chứa template
- [ ] README có hướng dẫn setup env
- [ ] CI/CD đã config secrets riêng

---

## 📚 Tài liệu tham khảo

- [GitHub: Removing sensitive data](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [OWASP: Secrets Management](https://owasp.org/www-community/vulnerabilities/Use_of_hard-coded_password)
- [VNPay Security Guidelines](https://vnpay.vn)

---

**Remember: Better safe than sorry! 🔐**
