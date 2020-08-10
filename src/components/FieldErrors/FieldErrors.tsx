import React from "react";

interface Props {
  errors: string[];
}

export function FieldErrors({ errors }: Props) {
  return errors.length ? (
    <div className="pt-2">
      {errors.map((error) => (
        <p key={error} className="text-red-500 text-xs italic">
          {error}
        </p>
      ))}
    </div>
  ) : null;
}
