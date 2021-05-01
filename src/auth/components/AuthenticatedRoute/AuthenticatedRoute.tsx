import React, { ReactNode, useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

interface Props {
  children: ReactNode;

  [key: string]: any;
}

export const AuthenticatedRoute = ({ children, ...rest }: Props) => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={() => (isAuthenticated() ? children : <Redirect to="/login" />)}
    ></Route>
  );
};
