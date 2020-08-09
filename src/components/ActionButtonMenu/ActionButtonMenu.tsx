import React, { ReactNode, Children } from "react";
import { Menu, MenuList, MenuLink, MenuButton } from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import "./ActionButtonMenu.css";

interface Props {
  children: ReactNode;
}

export function ActionButtonMenu({ children }: Props) {
  return (
    <Menu>
      <MenuButton>
        Actions <span aria-hidden>▾</span>
      </MenuButton>
      <MenuList className="action-button-menu">
        {Children.map(children, (child) => (
          <MenuLink className="action-button-menu__link">{child}</MenuLink>
        ))}
      </MenuList>
    </Menu>
  );
}
