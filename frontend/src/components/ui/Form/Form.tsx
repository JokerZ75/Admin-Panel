import React, { FC } from "react";
import index from "../../../pages/Home";

type FormProps = {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  id?: string;
};

const Form = ({ children, onSubmit, id }: FormProps) => {
  return <form id={id} onSubmit={onSubmit}>{children}</form>;
};

export default Form;
