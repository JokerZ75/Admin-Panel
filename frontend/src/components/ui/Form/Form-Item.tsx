import { type } from "os";
import React from "react";

type FormItemProps = {
  For: string;
  Type: string;
  Label: string;
  placeholder: string;
  OnChange?: (event: React.FormEvent<HTMLInputElement>) => void;
  register?: any;
  required?: boolean;
};

const FormItem = ({
  For,
  Type,
  Label,
  placeholder,
  register,
  required,
}: FormItemProps) => {
  return (
    <div>
      <label htmlFor={For}>{Label}</label>
      <input
        type={Type}
        id={For}
        placeholder={placeholder}
        {...register}
        required={required}
      />
    </div>
  );
};

export default FormItem;
