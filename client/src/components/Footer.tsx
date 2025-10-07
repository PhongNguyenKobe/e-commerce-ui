import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between md:gap-0 bg-gray-800 p-8 rounded-lg">
      <div className="flex flex-col gap-4 items-center md:items-start ">
        <Link href="/" className="flex items-center ">
          <Image src="/logo.png" alt="Logo" width={36} height={36} />
          <p className="hidden md:block text-md font-medium tracking-wider text-white">
            PhongNguyen
          </p>
        </Link>
        <p className="text-sm text-gray-400">© 2025 PhongNguyen</p>
        <p className="text-sm text-gray-400">All rights reserved</p>
      </div>
      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/">Trang chủ</Link>
        <Link href="/contact">Liên hệ</Link>
        <Link href="/privacy">Chính sách bảo mật</Link>
        <Link href="/terms">Điều khoản dịch vụ</Link>
      </div>

      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/">Tất cả sản phẩm</Link>
        <Link href="/new-arrivals">Sản phẩm mới</Link>
        <Link href="/new-arrivals">Best Sellers</Link>
        <Link href="/deals">Khuyến mãi</Link>
      </div>

      <div className="flex flex-col gap-4 text-sm text-gray-400 items-center md:items-start">
        <p className="text-sm text-amber-50">Links</p>
        <Link href="/faq">Câu hỏi thường gặp</Link>
        <Link href="/support">Hỗ trợ</Link>
        <Link href="/shipping">Vận chuyển</Link>
        <Link href="/returns">Trả hàng & Hoàn tiền</Link>
      </div>
    </div>
  );
};

export default Footer;
