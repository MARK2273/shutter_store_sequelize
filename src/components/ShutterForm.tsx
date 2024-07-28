import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import ShutterSection from "@/sections/ShutterSection";
import BasicInfoSection from "@/sections/BasicInfoSection";
import DiscountSection from "@/sections/DiscountSection";
import ButtonComponent from "@/components/common/ButtonComponent";
import { useContext, useEffect, useState } from "react";
import AddCustomer from "@/sections/AddCustomer";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "@/validators/shutterFormSchema";
import { FormType } from "@/types/basicInfoTypes";
import { AmountContext } from "@/contexts/AmountContext";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

export default function ShutterForm(): JSX.Element {
  const { finalAmount, setFinalAmount } = useContext(AmountContext) as {
    finalAmount: number;
    setFinalAmount: React.Dispatch<React.SetStateAction<number>>;
  };

  const params = useSearchParams();
  const id = params?.get("id");

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

  const [isModal, setIsModal] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`/api/orders/${id}`);
          reset({
            basicInfo: {
              customerName: data.customerName,
              staffName: data.staffName,
              date: new Date(data.date).toISOString().split("T")[0],
            },
            shutter: data.shutters,
            discountInfo: {
              discountType: data.discountType,
              discount: data.discount,
            },
            totalAmount: data.totalAmount,
          });
          setFinalAmount(data.totalAmount);
        } catch (error) {
          console.error("Error fetching order data:", error);
        }
      };

      fetchData();
    }
  }, [id, reset]);

  const onSubmit: SubmitHandler<FormType> = async (data: FormType) => {
    try {
      if (id) {
        await axios.put(`/api/orders/${id}`, data);
      } else {
        await axios.post("/api/shutters", data);
      }
      router.push("/list");
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
            label={id ? "Update" : "Proceed"}
            customClass={"mb-1 text-green-500 border-green-500"}
          />
        </form>
        {isModal && <AddCustomer setIsModal={setIsModal} />}
      </div>
    </div>
  );
}

ShutterForm.displayName = "ShutterForm";
