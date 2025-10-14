import{z}from"zod";

export type ProductType = {
    id: string | number;
    name: string;
    shortDescription: string;
    description: string;
    price: number;
    sizes: string[];
    colors: string[];
    images: Record<string, string>;
};

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
    quantity: number;
    selectedSize: string;
    selectedColor: string;
};

export type CartItemsType = CartItemType[];

export const shippingFormSchema = z.object({
  name: z.string().min(1, "Hãy ghi họ và tên của bạn!"),
  email: z.string().email("Email không hợp lệ!"),
  phone: z.string().regex(/^0\d{9,10}$/, "Số điện thoại phải bắt đầu bằng 0 và có 10–11 chữ số!"),
  province: z.string().min(1, "Vui lòng chọn tỉnh/thành phố"),
  district: z.string().min(1, "Vui lòng chọn quận/huyện"),
  ward: z.string().min(1, "Vui lòng chọn phường/xã"),
  address: z.string().min(1, "Hãy ghi địa chỉ chi tiết của bạn!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;