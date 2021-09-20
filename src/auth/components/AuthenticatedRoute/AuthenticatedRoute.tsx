import React, { ReactNode } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

type Props = {
    children: ReactNode;
    redirectRoute: string;
} & RouteProps;

export const AuthenticatedRoute = ({
                                       children,
                                       redirectRoute,
                                       ...rest
                                   }: Props) => {
    const { isAuthenticated } = useAuth();
    return (
        <Route
            {...rest}
            render={() =>
                isAuthenticated() ? children : <Redirect to={redirectRoute} />
            }
        ></Route>
    );
};
