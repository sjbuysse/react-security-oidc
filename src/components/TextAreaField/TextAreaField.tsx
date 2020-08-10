import React from "react";
import { FieldErrors } from "components";

interface Props {
  name: string;
  label: string;
  value: string | number | string[] | undefined;
  errors: string[];
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextAreaField({ name, label, value, errors, onChange }: Props) {
  return (
    <div className="flex items-center mb-6">
      <div className="w-1/4">
        <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
          {label}
        </label>
      </div>
      <div className="md:w-3/4">
        <textarea
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary-500"
          name={name}
          value={value}
          onChange={onChange}
        ></textarea>
        <FieldErrors errors={errors} />
      </div>
    </div>
  );
}
