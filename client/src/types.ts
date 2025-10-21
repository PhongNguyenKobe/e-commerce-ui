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

// Schema thanh toán - Payment form schema
export const paymentFormSchema = z.object({
  paymentMethod: z.enum(["vnpay", "stripe"], {
    message: "Vui lòng chọn phương thức thanh toán!",
  }),
  // VNPay fields
  bankCode: z.string().optional(),
  // Stripe fields (chỉ required khi chọn Stripe)
  cardHolder: z.string().optional(),
  cardNumber: z.string().optional(),
  expirationDate: z.string().optional(),
  cvv: z.string().optional(),
}).refine(
  (data) => {
    if (data.paymentMethod === "stripe") {
      return (
        data.cardHolder &&
        data.cardNumber &&
        data.cardNumber.length === 16 &&
        data.expirationDate &&
        /^(0[1-9]|1[0-2])\/\d{2}$/.test(data.expirationDate) &&
        data.cvv &&
        data.cvv.length === 3
      );
    }
    return true;
  },
  {
    message: "Vui lòng điền đầy đủ thông tin thẻ!",
    path: ["cardHolder"],
  }
);

export type PaymentFormInputs = z.infer<typeof paymentFormSchema>;

export type CardStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
}

export type CardStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
}