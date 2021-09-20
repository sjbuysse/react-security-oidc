import React, { createContext } from "react";
import axios, { AxiosInstance } from "axios";
import { useAuth } from "./AuthContext";

const FetchContext = createContext<AxiosInstance>(axios);
const { Provider } = FetchContext;

const FetchProvider = ({ children }: { children: React.ReactNode }) => {
    const authAxios = axios.create({
        baseURL: process.env.REACT_APP_API_URL,
    });
    const { authState } = useAuth();

    authAxios.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${authState?.token}`;
            return config;
        },
        (error) => Promise.reject(error)
    );

    return <Provider value={authAxios}>{children}</Provider>;
};

export { FetchContext, FetchProvider };
