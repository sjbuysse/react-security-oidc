import React, { ReactNode } from "react";
import { Dialog as ReachUIDialog } from "@reach/dialog";
import "@reach/dialog/styles.css";

interface Props {
  show: boolean;
  title: string;
  children?: ReactNode;
  onClose: (e: any) => void;
}

export function Dialog({ show, title, children, onClose }: Props) {
  if (!show) {
    return null;
  }

  return (
    <ReachUIDialog
      tabIndex={-1}
      style={{ padding: 0 }}
      className="w-1/2 rounded overflow-hidden shadow-lg"
      isOpen={show}
      onDismiss={onClose}
      aria-label="Dialog"
    >
      <div className="flex justify-between items-center border-b p-6 text-xl">
        <h6 className="text-xl font-bold">{title}</h6>
        <button type="button" onClick={onClose}>
          ✖
        </button>
      </div>
      <div className="flex justify-between items-center p-6">{children}</div>
    </ReachUIDialog>
  );
}
