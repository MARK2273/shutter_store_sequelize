"use client";

import React, { useContext, useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { AmountContext } from "@/contexts/AmountContext";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import ButtonComponent from "@/components/common/ButtonComponent";
import SelectComponent from "@/components/common/SelectComponent";
import TextComponent from "@/components/common/TextComponent";
import { FormType } from "@/types/basicInfoTypes";
import Image from "next/image";
import DragImg from "../../public/image.png";

const ShutterNames: string[] = ["A", "B", "C"];

export default function ShutterRow({
  id,
  index,
  handleRemoveShutter,
  handleCloneShutter,
  register,
  errors,
  watch,
  setValue,
}: {
  id: string;
  index: number;
  handleRemoveShutter: (index: number) => void;
  handleCloneShutter: (index: number) => void;
  register: UseFormRegister<FormType>;
  errors: FieldErrors<FormType>;
  watch: UseFormWatch<FormType>;
  setValue: UseFormSetValue<FormType>;
}) {
  const { setFinalAmount } = useContext(AmountContext) as {
    finalAmount: number;
    setFinalAmount: React.Dispatch<React.SetStateAction<number>>;
  };

  const [area, setArea] = useState(0);
  const [width, setWidth] = useState(+watch(`shutter.${index}.width`));
  const [height, setHeight] = useState(+watch(`shutter.${index}.height`));

  useEffect(() => {
    setArea(width * height);
    setFinalAmount(
      (prev: number): number =>
        +(prev + Number(width) * Number(height)).toFixed(2)
    );
  }, [height, width, setFinalAmount, index]);

  useEffect(() => {
    setValue(`shutter.${index}.area`, Number(area.toFixed(2)));
  }, [area, index, setValue]);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      key={id}
      className="flex gap-3 items-end"
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <span
        {...listeners}
        className="cursor-move p-2 rounded mb-1 "
        aria-label="Drag handle"
      >
        <Image
          src={DragImg}
          width={25}
          height={30}
          alt="Picture of the author"
          className="opacity-20"
        />
      </span>
      <SelectComponent
        register={register}
        errors={errors}
        name={`shutter.${index}.shutterName`}
        label={"Shutter Name"}
        options={ShutterNames}
      />
      <TextComponent
        register={register}
        errors={errors}
        type="text"
        name={`shutter.${index}.width`}
        label="Width"
        handleChange={(e) => setWidth(+e.target.value)}
      />
      <TextComponent
        register={register}
        errors={errors}
        type="text"
        name={`shutter.${index}.height`}
        label="Height"
        handleChange={(e) => setHeight(+e.target.value)}
      />
      <TextComponent
        register={register}
        errors={errors}
        type="float"
        name={`shutter.${index}.area`}
        label="Area"
        isDisabled={true}
        customClass="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
      <ButtonComponent
        handleClick={() => handleRemoveShutter(index)}
        label={"Remove"}
        customClass={"mb-1 text-red-500 border-red-500"}
      />
      <ButtonComponent
        handleClick={() => handleCloneShutter(index)}
        label={"Clone"}
        customClass={"mb-1 text-blue-500 border-blue-500 "}
      />
    </div>
  );
}
