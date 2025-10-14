"use client";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { shippingFormSchema, ShippingFormInputs } from "@/types";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";


type Props = {
  setShippingForm?: (data: ShippingFormInputs) => void;
};

const ShippingForm = ({ setShippingForm }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
  });

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);
  const router = useRouter();


  const selectedProvince = watch("province");
  const selectedDistrict = watch("district");

  useEffect(() => {
    fetch("/data/provinces.json")
      .then((res) => res.json())
      .then((data) => setProvinces(data));
  }, []);

  useEffect(() => {
    const province = provinces.find((p) => p.name === selectedProvince);
    setDistricts(province?.districts || []);
    setValue("district", "");
    setValue("ward", "");
    setWards([]);
  }, [selectedProvince]);

  useEffect(() => {
    const district = districts.find((d) => d.name === selectedDistrict);
    setWards(district?.wards || []);
    setValue("ward", "");
  }, [selectedDistrict]);

  const onSubmit = (data: ShippingFormInputs) => {
    if (setShippingForm) {
      setShippingForm(data);
    } else {
      console.log("Thông tin giao hàng:", data);
    }
  };
  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    onSubmit(data); 
    router.push("/cart?step=3", { scroll: false });
  };
  return (
    <form onSubmit={handleSubmit(handleShippingForm)} className="flex flex-col gap-6">
      {/* Họ và tên */}
      <div className="flex flex-col gap-1">
        <label htmlFor="name" className="text-xs text-gray-500 font-medium">
          Họ và tên
        </label>
        <input
          id="name"
          type="text"
          placeholder="ví dụ: Nguyễn Văn A"
          {...register("name")}
          className={`border-b py-2 outline-none text-sm ${
            errors.name ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.name && (
          <p className="text-xs text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs text-gray-500 font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="ví dụ: email@example.com"
          {...register("email")}
          className={`border-b py-2 outline-none text-sm ${
            errors.email ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Số điện thoại */}
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs text-gray-500 font-medium">
          Số điện thoại
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="ví dụ: 0123456789"
          {...register("phone")}
          className={`border-b py-2 outline-none text-sm ${
            errors.phone ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>

      {/* Tỉnh/Thành phố */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">
          Tỉnh/Thành phố{" "}
          <span className="text-[10px] text-gray-400">
            (theo địa giới hành chính cũ)
          </span>
        </label>

        <select
          {...register("province")}
          className={`border-b py-2 outline-none text-sm ${
            errors.province ? "border-red-500" : "border-gray-200"
          }`}
        >
          <option value="">Chọn tỉnh/thành</option>
          {provinces.map((p) => (
            <option key={p.code} value={p.name}>
              {p.name}
            </option>
          ))}
        </select>
        {errors.province && (
          <p className="text-xs text-red-500">{errors.province.message}</p>
        )}
      </div>

      {/* Quận/Huyện */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">
          Quận/Huyện{" "}
          <span className="text-[10px] text-gray-400">
            (theo địa giới hành chính cũ)
          </span>
        </label>
        <select
          {...register("district")}
          className={`border-b py-2 outline-none text-sm ${
            errors.district ? "border-red-500" : "border-gray-200"
          }`}
        >
          <option value="">Chọn quận/huyện</option>
          {districts.map((d) => (
            <option key={d.code} value={d.name}>
              {d.name}
            </option>
          ))}
        </select>
        {errors.district && (
          <p className="text-xs text-red-500">{errors.district.message}</p>
        )}
      </div>

      {/* Phường/Xã */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500 font-medium">
          Phường/Xã{" "}
          <span className="text-[10px] text-gray-400">
            (dữ liệu hành chính cũ)
          </span>
        </label>
        <select
          {...register("ward")}
          className={`border-b py-2 outline-none text-sm ${
            errors.ward ? "border-red-500" : "border-gray-200"
          }`}
        >
          <option value="">Chọn phường/xã</option>
          {wards.map((w) => (
            <option key={w.code} value={w.name}>
              {w.name}
            </option>
          ))}
        </select>
        {errors.ward && (
          <p className="text-xs text-red-500">{errors.ward.message}</p>
        )}
      </div>

      {/* Địa chỉ chi tiết */}
      <div className="flex flex-col gap-1">
        <label htmlFor="address" className="text-xs text-gray-500 font-medium">
          Địa chỉ chi tiết
        </label>
        <input
          id="address"
          type="text"
          placeholder="Số nhà, tên đường..."
          {...register("address")}
          className={`border-b py-2 outline-none text-sm ${
            errors.address ? "border-red-500" : "border-gray-200"
          }`}
        />
        {errors.address && (
          <p className="text-xs text-red-500">{errors.address.message}</p>
        )}
      </div>

      {/* Nút gửi */}
       <button
type="submit"
className="w-full bg-gray-700 hover:bg-gray-900 transition-all duration-300 text-white p-2 cursor-pointer rounded-lg flex items-center justify-center gap-2"
            >
              Tiến hành thanh toán{" "}
              <ArrowRight className="w-3 h-3 relative top-[2px]" />
            </button>
    </form>
  );
};

export default ShippingForm;
