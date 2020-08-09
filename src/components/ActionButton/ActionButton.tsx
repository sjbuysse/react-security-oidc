import React from "react";

export enum ActionButtonType {
  CREATE = "CREATE",
  EDIT = "EDIT",
  DELETE = "DELETE",
}

interface Props {
  className?: string;
  type: ActionButtonType;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export function ActionButton({ className = "", type, label, onClick }: Props) {
  let classNameStr = "";

  if (type === ActionButtonType.CREATE) {
    classNameStr = `${className} bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded`;
  }

  if (type === ActionButtonType.EDIT) {
    classNameStr = `${className} bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded`;
  }

  if (type === ActionButtonType.DELETE) {
    classNameStr = `${className} bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded`;
  }

  return (
    <button className={classNameStr} onClick={onClick}>
      {label}
    </button>
  );
}
