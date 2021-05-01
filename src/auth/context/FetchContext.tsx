import React, { createContext, useContext } from "react";
import axios, { AxiosInstance } from "axios";
import { AuthContext } from "./AuthContext";

const FetchContext = createContext<AxiosInstance>(axios);
const { Provider } = FetchContext;

const FetchProvider = ({ children }: { children: React.ReactNode }) => {
  const { authState } = useContext(AuthContext);
  const authAxios = axios.create({
    baseURL: "http://localhost:4000",
  });

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
