import Image from "next/image";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const popularProducts = [
  {
    id: 1,
    name: "Áo thun Adidas CoreFit",
    shortDescription: "Áo thun thể thao thoáng khí, phù hợp tập luyện và mặc hàng ngày.",
    description:
      "Áo thun Adidas CoreFit với chất liệu co giãn, thấm hút mồ hôi tốt. Thiết kế đơn giản, dễ phối đồ, phù hợp với mọi hoạt động thường ngày.",
    price: 399000,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["gray", "purple", "green"],
    images: {
      gray: "/products/1g.png",
      purple: "/products/1p.png",
      green: "/products/1gr.png",
    },
  },
  {
    id: 2,
    name: "Áo khoác Puma Ultra Warm Zip",
    shortDescription: "Áo khoác giữ ấm, thiết kế thể thao năng động.",
    description:
      "Áo khoác Puma Ultra Warm Zip với lớp lót giữ nhiệt, khóa kéo tiện lợi. Phù hợp với thời tiết se lạnh ở miền Bắc và Đà Lạt.",
    price: 599000,
    sizes: ["S", "M", "L", "XL"],
    colors: ["gray", "green"],
    images: {
      gray: "/products/2g.png",
      green: "/products/2gr.png",
    },
  },
  {
    id: 3,
    name: "Áo hoodie Nike Air Essentials",
    shortDescription: "Áo hoodie phong cách trẻ trung, giữ ấm tốt.",
    description:
      "Nike Air Essentials Pullover là lựa chọn lý tưởng cho mùa đông. Chất liệu dày dặn, form rộng thoải mái, phù hợp với giới trẻ Việt.",
    price: 699000,
    sizes: ["S", "M", "L"],
    colors: ["green", "blue", "black"],
    images: {
      green: "/products/3gr.png",
      blue: "/products/3b.png",
      black: "/products/3bl.png",
    },
  },
  {
    id: 4,
    name: "Áo thun Nike Dri-Flex",
    shortDescription: "Áo thun co giãn, thấm hút mồ hôi tốt.",
    description:
      "Nike Dri-Flex T-Shirt giúp bạn thoải mái khi vận động. Thiết kế đơn giản, màu sắc trẻ trung, phù hợp với học sinh, sinh viên.",
    price: 299000,
    sizes: ["S", "M", "L"],
    colors: ["white", "pink"],
    images: {
      white: "/products/4w.png",
      pink: "/products/4p.png",
    },
  },
  {
    id: 5,
    name: "Áo khoác Under Armour StormFleece",
    shortDescription: "Áo khoác chống gió, giữ nhiệt tốt.",
    description:
      "StormFleece là dòng áo khoác cao cấp của Under Armour, phù hợp với thời tiết lạnh ở miền núi hoặc đi phượt.",
    price: 499000,
    sizes: ["S", "M", "L"],
    colors: ["red", "orange", "black"],
    images: {
      red: "/products/5r.png",
      orange: "/products/5o.png",
      black: "/products/5bl.png",
    },
  },
];

const latestTransactions = [
  {
    id: 1,
    title: "Đơn hàng thanh toán",
    badge: "John Doe",
    image:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 14000000,
  },
  {
    id: 2,
    title: "Đơn hàng thanh toán",
    badge: "Jane Smith",
    image:
      "https://images.pexels.com/photos/4969918/pexels-photo-4969918.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2100000,
  },
  {
    id: 3,
    title: "Đơn hàng thanh toán",
    badge: "Michael Johnson",
    image:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1300000,
  },
  {
    id: 4,
    title: "Đơn hàng thanh toán",
    badge: "Lily Adams",
    image:
      "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 2500000,
  },
  {
    id: 5,
    title: "Đơn hàng thanh toán",
    badge: "Sam Brown",
    image:
      "https://images.pexels.com/photos/1680175/pexels-photo-1680175.jpeg?auto=compress&cs=tinysrgb&w=800",
    count: 1400000,
  },
];

const CardList = ({ title }: { title: string }) => {
 
  return (
    <div className="">
      <h1 className="text-lg font-medium mb-6">{title}</h1>
      <div className="flex flex-col gap-2">
        {title === "Sản phẩm phổ biến"? popularProducts.map((item) => (
          <Card key={item.id} className="flex-row items-center justify-between gap-4 p-4">
            <div className="w-12 h-12 rounded-sm relative overflow-hidden">
              <Image
                src={Object.values(item.images)[0] || ""}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex-1 p-0">
              <CardTitle className="text-sm font-medium">{item.name}</CardTitle>
            </CardContent>
            <CardFooter className="p-0">
              {item.price.toLocaleString("vi-VN")} đ
            </CardFooter>
          </Card>
        )): latestTransactions.map((item) => (<Card key={item.id} className="flex-row items-center justify-between gap-4 p-4">
            <div className="w-12 h-12 rounded-sm relative overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="flex-1 p-0">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            </CardContent>
            <Badge variant="secondary">{item.badge}</Badge>
            <CardFooter className="p-0">
              {item.count.toLocaleString("vi-VN")} đ
            </CardFooter>
          </Card>))}
      </div>
    </div>
  );
};

export default CardList;
