import React from "react";
import { FieldErrors } from "components";

interface Props {
    name: string;
    className?: string;
    value: string | number | string[] | undefined;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hasFocus?: boolean;
}

export function InputFieldBase({name, placeholder, value, onChange, className, hasFocus = false,}: Props) {
    return (
        <input
            autoFocus={hasFocus}
            className={`${className} bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary-500`}
            placeholder={placeholder}
            type="text"
            name={name}
            value={value}
            onChange={onChange}
        ></input>
    );
}
