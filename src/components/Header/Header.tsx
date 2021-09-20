import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectIsReadOnly} from "../../state/selectors";
import {toggleReadOnly} from "../../state/actions";
import {Lock} from "../Icons/Lock";
import {useAuth} from "../../auth/contexts/AuthContext";
import {UserMenu} from "./UserMenu";

interface Props {
    title: string;
    handleClickMenuButton: () => void;
}

export function Header({title, handleClickMenuButton}: Props) {
    const isReadOnly = useSelector(selectIsReadOnly);
    const { login, logout, authState, isAuthenticated } = useAuth();
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
                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
                </svg>
            </button>
            <h1 className="pl-3">{title}</h1>
            <span className='ml-auto'>
            {isAuthenticated() && (
                <Lock
                    isOpen={!isReadOnly}
                    onClick={() => dispatch(toggleReadOnly())}
                />

            )}
                <UserMenu
                    login={login}
                    isAuthenticated={isAuthenticated}
                    userName={authState?.userInfo.name}
                    tokenExpiresAt={authState?.expiresAt}
                    logout={logout}
                ></UserMenu>
            </span>
        </nav>
    );
}
