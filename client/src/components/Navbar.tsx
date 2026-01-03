import Link from "next/dist/client/link";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { Bell, Home, ShoppingCart, Settings } from "lucide-react";
import ShoppingCartIcon from "./ShoppingCartIcon";

const Navbar = () => {
  const adminUrl = process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001";

  return (
    <nav className="w-full flex items-center justify-between border-b border-gray-300 pb-4">
      {/* LEFT */}
      <Link href="/" className="flex items-center ">
        <Image
          src="/logo.png"
          alt="Logo"
          width={36}
          height={36}
          className="w-6 h-6 md:h-9 md:w-9"
        />
        <p className="hidden md:block text-md font-medium tracking-wider">
          PhongNguyen
        </p>
      </Link>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <SearchBar />
        <Link href="/">
          <Home className="w-4 h-4 text-gray-600"/>
        </Link>
        <Bell className="w-4 h-4 text-gray-600"/>
        <ShoppingCartIcon />
        <a href={adminUrl} title="Admin Dashboard" className="hover:text-blue-600 transition-colors cursor-pointer">
          <Settings className="w-4 h-4 text-gray-600"/>
        </a>
        <Link href="/login">Đăng nhập</Link>
      </div>
    </nav>
  );
};

export default Navbar;
