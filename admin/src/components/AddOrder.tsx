"use client";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

const formSchema = z.object({
  amount: z
    .number()
    .min(1, { message: "Số lượng phải lớn hơn 1!" }),
  userId: z.string().min(1, { message: "Yêu cầu phải có ID người dùng!" }),
  status: z.enum([
  "draft",         // Đơn nháp
  "pending",       // Đơn mới
  "processing",    // Đang xử lý
  "on_hold",       // Tạm dừng
  "shipped",       // Đã giao
  "delivered",     // Đã nhận
  "cancelled",     // Bị hủy
  "failed",        // Lỗi
  "refunded",      // Đã hoàn tiền
  "returned",      // Đã trả hàng
])
});

const AddOrder = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 0,
      userId: "",
      status: "pending",
    },
  });
  return (
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="mb-4">Thêm đơn hàng</SheetTitle>
        <SheetDescription asChild>
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Nhập số lượng sản phẩm.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID người dùng</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Nhập ID người dùng.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trạng thái</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn trạng thái" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="draft">Đơn nháp</SelectItem>
                        <SelectItem value="pending">Đơn mới</SelectItem>
                        <SelectItem value="processing">Đang xử lý</SelectItem>
                        <SelectItem value="on_hold">Tạm dừng</SelectItem>
                        <SelectItem value="shipped">Đã giao</SelectItem>
                        <SelectItem value="delivered">Đã nhận</SelectItem>
                        <SelectItem value="cancelled">Bị hủy</SelectItem>
                        <SelectItem value="failed">Lỗi</SelectItem>
                        <SelectItem value="refunded">Đã hoàn tiền</SelectItem>
                        <SelectItem value="returned">Đã trả hàng</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      Chọn trạng thái đơn hàng.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Thêm</Button>
            </form>
          </Form>
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  );
};

export default AddOrder;
