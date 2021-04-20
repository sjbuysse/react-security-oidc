import React from "react";
import { Icon } from "./Icon";

const USER =
  "M18 22.082v-1.649c2.203-1.241 4-4.337 4-7.432 0-4.971 0-9-6-9s-6 4.029-6 9c0 3.096 1.797 6.191 4 7.432v1.649c-6.784 0.555-12 3.888-12 7.918h28c0-4.030-5.216-7.364-12-7.918z";

interface Props {
  className?: string;
  [key: string]: any;
}

export const UserIcon = ({ className = "", ...restProps }: Props) => (
  <Icon
    className={`${className} cursor-pointer`}
    {...restProps}
    icon={USER}
    size={28}
  />
);
