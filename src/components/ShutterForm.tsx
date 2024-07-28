"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ShutterSection, {
  ShutterListT,
  ShutterT,
} from "@/sections/ShutterSection";
import BasicInfoSection from "@/sections/BasicInfoSection";
import DiscountSection from "@/sections/DiscountSection";
import ButtonComponent from "@/components/common/ButtonComponent";
import { useContext, useEffect, useState, useCallback } from "react";
import AddCustomer from "@/sections/AddCustomer";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "@/validators/shutterFormSchema";
import { FormType } from "@/types/basicInfoTypes";
import { AmountContext } from "@/contexts/AmountContext";
import axios from "axios";
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function ShutterForm(): JSX.Element {
  const { finalAmount } = useContext(AmountContext) as {
    finalAmount: number;
  };

  const params: ReadonlyURLSearchParams | null = useSearchParams();

  const id: string | null | undefined = params?.get("id");

  // const orderDetails = useSelector((state: RootState) => {
  //   if (!id) return undefined;
  //   return state.form.find((_, index: number) => index === +id);
  // });

  // const temp = orderDetails
  //   ? {
  //     basicInfo: {
  //       staffName: orderDetails.basicInfo.staffName,
  //       customerName: orderDetails.basicInfo.customerName,
  //       date: new Date(orderDetails.basicInfo.date)
  //         .toISOString()
  //         .split("T")[0],
  //     },
  //     shutter: orderDetails.shutter,
  //     discountInfo: {
  //       discountType: orderDetails.discountInfo.discountType,
  //       discount: +orderDetails.discountInfo.discount,
  //     },
  //     totalAmount: orderDetails.totalAmount,
  //   }
  //   : {
  //       discountInfo: { discount: 0, discountType: "amount" },
  //       shutter: [
  //         {
  //           shutterName: "",
  //           width: "",
  //           height: "",
  //           area: 0,
  //         },
  //       ],
  //     };

  const {
    formState: { errors },
    handleSubmit,
    register,
    watch,
    setValue,
    control,
    reset,
    getValues,
  } = useForm<FormType>({
    resolver: yupResolver(validationSchema),
    context: { finalAmount: finalAmount },
    defaultValues: {
      discountInfo: { discount: 0, discountType: "amount" },
      shutter: [
        {
          shutterName: "",
          width: "",
          height: "",
          area: 0,
        },
      ],
    },
  });

  // useEffect(() => {
  //   console.log(orderDetails, "details");
  //   if (orderDetails) {
  //     reset({
  //       basicInfo: {
  //         staffName: orderDetails.basicInfo.staffName,
  //         customerName: orderDetails.basicInfo.customerName,
  //         date: new Date(orderDetails.basicInfo.date)
  //           .toISOString()
  //           .split("T")[0],
  //       },
  //       shutter: orderDetails.shutter,
  //       discountInfo: {
  //         discountType: orderDetails.discountInfo.discountType,
  //         discount: +orderDetails.discountInfo.discount,
  //       },
  //       totalAmount: orderDetails.totalAmount,
  //     });
  //   }
  // }, [id, orderDetails, reset]);

  const [isModal, setIsModal] = useState(false);

  const route = useRouter();

  // const onSubmit: SubmitHandler<FormType> = useCallback(
  //   (data: FormType) => {
  //     // const shutterData: ShutterListT = data.shutter.map(
  //     //   (shutter: ShutterT): ShutterT => ({
  //     //     shutterName: shutter.shutterName,
  //     //     width: shutter.width,
  //     //     height: shutter.height,
  //     //     area: Number((Number(shutter.width) * Number(shutter.height)).toFixed(2)),
  //     //   })
  //     // );

  //     // const formData = {
  //     //   discountInfo: {
  //     //     discountType: data.discountInfo.discountType,
  //     //     discount: data.discountInfo.discount,
  //     //   },
  //     //   basicInfo: {
  //     //     staffName: data.basicInfo.staffName,
  //     //     customerName: data.basicInfo.customerName,
  //     //     date: data.basicInfo.date,
  //     //   },
  //     //   shutter: shutterData,
  //     //   totalAmount: finalAmount.toString(),
  //     // };

  //     // if (id) {
  //     //   dispatch(editFormData({ index: +id, data: formData }));
  //     // } else {
  //     //   dispatch(addFormData(formData));
  //     // }

  //     console.log(data);

  //     // route.push("/list");
  //   },
  //   [id, route, finalAmount]
  // );

  const onSubmit: SubmitHandler<FormType> = async (data: FormType) => {
    try {
      console.log(data);
      await axios.post("/api/shutters", data);
      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  return (
    <div id="shutterForm" className="w-full">
      <div id="basicInfo" className="flex justify-center h-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex gap-10 flex-col border p-5 shadow-lg rounded-md"
        >
          <BasicInfoSection
            setIsModal={setIsModal}
            register={register}
            errors={errors}
          />
          <ShutterSection
            register={register}
            errors={errors}
            watch={watch}
            setValue={setValue}
            control={control}
            getValues={getValues}
          />
          <DiscountSection register={register} errors={errors} watch={watch} />
          <ButtonComponent
            type="submit"
            label={"Proceed"}
            customClass={"mb-1 text-green-500 border-green-500"}
          />
        </form>
        {isModal && <AddCustomer setIsModal={setIsModal} />}
      </div>
    </div>
  );
}

ShutterForm.displayName = "ShutterForm";
