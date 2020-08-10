import React from "react";
import { FieldErrors } from "components";

interface Props {
  name: string;
  label: string;
  value: string | number | string[] | undefined;
  errors: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasFocus?: boolean;
}

export function InputField({
  name,
  label,
  value,
  errors,
  onChange,
  hasFocus = false,
}: Props) {
  return (
    <>
      <div className="flex items-center mb-6">
        <div className="w-1/4">
          <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
            {label}
          </label>
        </div>
        <div className="w-3/4">
          <input
            autoFocus={hasFocus}
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary-500"
            type="text"
            name={name}
            value={value}
            onChange={onChange}
          ></input>
          <FieldErrors errors={errors} />
        </div>
      </div>
    </>
  );
}
