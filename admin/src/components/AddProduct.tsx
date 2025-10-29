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
import { Description } from "@radix-ui/react-dialog";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { ScrollArea } from "./ui/scroll-area";

const categories = [
  "Áo thun",
  "Giày dép",
  "Phụ kiện",
  "Túi xách",
  "Đầm váy",
  "Áo khoác",
  "Găng tay",
] as const;

const colors = [
  "blue",
  "green",
  "red",
  "yellow",
  "purple",
  "orange",
  "pink",
  "brown",
  "gray",
  "black",
  "white",
] as const;

const sizes = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "34",
  "35",
  "36",
  "37",
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
] as const;

const formSchema = z.object({
  name: z.string().min(2, { message: "Hãy ghi tên sản phẩm!" }).max(100),
  shortDescription: z
    .string()
    .min(1, { message: "Hãy ghi mô tả ngắn cho sản phẩm!" })
    .max(100),
  description: z.string().min(1, { message: "Hãy ghi mô tả cho sản phẩm!" }),
  price: z.number().min(1, { message: "Hãy ghi giá cho sản phẩm!" }),
  category: z.enum(categories),
  sizes: z
    .array(z.enum(sizes))
    .min(1, { message: "Chọn ít nhất một kích thước!" }),
  colors: z.array(z.enum(colors)).min(1, { message: "Chọn ít nhất một màu!" }),
  images: z.record(z.enum(colors), z.string()),
});

const AddProduct = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      price: 0,
      category: categories[0],
      sizes: [],
      colors: [],
      images: {},
    },
  });
  return (
    <SheetContent>
      <ScrollArea className="h-screen">
        <SheetHeader>
          <SheetTitle className="mb-4">Thêm sản phẩm</SheetTitle>
          <SheetDescription asChild>
            <Form {...form}>
              <form className="space-y-8">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên sản phẩm</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập tên đầy đủ của sản phẩm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* mô tả ngắn */}
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả ngắn</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập mô tả ngắn cho sản phẩm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* mô tả */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mô tả</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormDescription>
                        Nhập mô tả cho sản phẩm. (tùy chọn).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Giá</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Nhập giá cho sản phẩm.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* danh mục */}
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục</FormLabel>
                      <Select>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Chọn danh mục" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Chọn danh mục cho sản phẩm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* kích thước */}
                <FormField
                  control={form.control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sizes</FormLabel>
                      <FormControl>
                        <div className="grid grid-cols-3 gap-4 my-2">
                          {sizes.map((size) => (
                            <div className="flex items-center gap-2" key={size}>
                              <Checkbox
                                id="size"
                                checked={field.value.includes(size)}
                                onCheckedChange={(checked) => {
                                  const currentValues = field.value || [];
                                  if (checked) {
                                    // Thêm size vào mảng nếu được chọn
                                    field.onChange([...currentValues, size]);
                                  } else {
                                    // Loại bỏ size khỏi mảng nếu bị bỏ chọn
                                    field.onChange(
                                      currentValues.filter((v) => v !== size)
                                    );
                                  }
                                }}
                              />
                              <label htmlFor="size" className="text-xs">
                                {size}
                              </label>
                            </div>
                          ))}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Chọn sizes cho sản phẩm.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* màu sắc */}
                <FormField
                  control={form.control}
                  name="colors"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Màu sắc</FormLabel>
                      <FormControl>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4 my-2">
                            {colors.map((color) => (
                              <div
                                className="flex items-center gap-2"
                                key={color}
                              >
                                <Checkbox
                                  id="color"
                                  checked={field.value.includes(color)}
                                  onCheckedChange={(checked) => {
                                    const currentValues = field.value || [];
                                    if (checked) {
                                      // Thêm color vào mảng nếu được chọn
                                      field.onChange([...currentValues, color]);
                                    } else {
                                      // Loại bỏ color khỏi mảng nếu bị bỏ chọn
                                      field.onChange(
                                        currentValues.filter((v) => v !== color)
                                      );
                                    }
                                  }}
                                />
                                <label
                                  htmlFor="color"
                                  className="text-xs flex items-center gap-2"
                                >
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: color }}
                                  />
                                  {color}
                                </label>
                              </div>
                            ))}
                          </div>
                          {field.value && field.value.length > 0 && (
                            <div className="mt-8 space-y-4">
                              <p className=" text-sm font-medium">Tải hình ảnh tương ứng với màu sắc đã chọn</p>
                              {field.value.map(color=>(
                                <div className="flex items-center gap-2" key={color}>
                                  <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: color }}
                                  />
                                  <span className="text-sm min-w-[60px]">{color}</span>
                                  <Input type="file" accept="image/*"/>
                                </div>
                              ))}
                              </div>
                          )}
                        </div>
                      </FormControl>
                      <FormDescription>
                        Chọn màu sắc cho sản phẩm.
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
      </ScrollArea>
    </SheetContent>
  );
};

export default AddProduct;
