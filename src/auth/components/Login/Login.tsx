import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

export const Login = () => {
  const { login } = useContext(AuthContext);
  useEffect(() => login(), []);
  return <></>;
};
