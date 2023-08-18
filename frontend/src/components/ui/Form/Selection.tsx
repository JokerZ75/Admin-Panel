import React from "react";

type SelectionProps = {
  For: string;
  Label: string;
  Options: string[];
  register?: any;
};

const Selection = ({ For, Label, Options, register }: SelectionProps) => {
  return (
    <div>
      <label htmlFor={For}>{Label}</label>
      <select {...register} id={For}>
        {Options.map((option) => {
          return <option key={option} value={option}>{option}</option>;
        })}
      </select>
    </div>
  );
};

export default Selection;
