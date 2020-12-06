import React from "react";
import { FieldErrors } from "components";
import { InputFieldBase } from '../InputFieldBase/InputFieldBase';

interface Props {
    name: string;
    label: string;
    value: string | number | string[] | undefined;
    errors: string[];
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hasFocus?: boolean;
}

export function InputField({name, label, value, errors, onChange, hasFocus = false,}: Props) {
    return (
        <>
            <div className="flex items-center mb-6">
                <div className="w-1/4">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        {label}
                    </label>
                </div>
                <div className="w-3/4">
                    <InputFieldBase name={name} value={value} onChange={onChange} className='px-4' hasFocus={hasFocus}/>
                    <FieldErrors errors={errors}/>
                </div>
            </div>
        </>
    );
}
