import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsReadOnly } from "../../state/selectors";
import { UserIcon } from "../Icons/User";
import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  MenuPopover,
} from "@reach/menu-button";
import "@reach/menu-button/styles.css";
import { Profile } from "oidc-client";
import { Lock } from "../Icons/Lock";
import { toggleReadOnly } from "../../state/actions";

interface Props {
  title: string;
  handleClickMenuButton: () => void;
  login: () => void;
  logout: () => void;
  userInfo?: Profile;
}

export function Header({
  title,
  handleClickMenuButton,
  logout,
  login,
  userInfo,
}: Props) {
  const isReadOnly = useSelector(selectIsReadOnly);
  const dispatch = useDispatch();

  return (
    <nav className="flex items-center flex-wrap bg-primary-500 p-6">
      <button
        className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
        onClick={handleClickMenuButton}
      >
        <svg
          className="fill-current h-3 w-3"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
      <h1 className="pl-3">{title}</h1>
      <span className={"ml-auto"}>
        <>
          {!!userInfo && (
            <Lock
              isOpen={!isReadOnly}
              onClick={() => dispatch(toggleReadOnly())}
              className={"ml-auto"}
            />
          )}
        </>
        <UserMenu login={login} userInfo={userInfo} logout={logout}></UserMenu>
      </span>
    </nav>
  );
}

const UserMenu = ({
  login,
  userInfo,
  logout,
}: Pick<Props, "login" | "logout" | "userInfo">) => (
  <Menu>
    <MenuButton>
      <UserIcon />
    </MenuButton>
    {userInfo ? (
      <MenuPopover>
        <UserInfo logout={logout} userInfo={userInfo} />
        <button onClick={logout}>Logout</button>
      </MenuPopover>
    ) : (
      <MenuList>
        <MenuItem onSelect={login}>Login</MenuItem>
      </MenuList>
    )}
  </Menu>
);

const UserInfo = ({
  logout,
  userInfo,
}: Pick<Props, "logout"> & { userInfo: Profile }) => (
  <div className="bg-white">{userInfo.name}</div>
);
