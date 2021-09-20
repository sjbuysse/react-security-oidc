import React, { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";

export const Login = () => {
    const { login } = useAuth();
    useEffect(() => login(), []);
    return <></>;
};
