import React, { createContext, useEffect, useRef, useState } from "react";
import { Profile, User } from "oidc-client";
import { AuthService } from "../services/AuthService";

interface AuthState {
  token: string | null;
  expiresAt: string | null;
  userInfo: Profile | null;
}

interface IAuthContext {
  authState: AuthState;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  authState: {
    token: null,
    expiresAt: null,
    userInfo: null,
  },
  login: () => {},
  logout: () => {},
});
const { Provider } = AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authService = useRef<AuthService>();
  const [authState, setAuthState] = useState({
    token: null,
    expiresAt: null,
    userInfo: null,
  });

  useEffect(() => {
    authService.current = new AuthService();
    getUser();
  }, []);

  const login = () => {
    if (authService.current) {
      authService.current.login();
    } else {
      console.log("authService not initialized");
    }
  };

  const logout = () => {
    if (authService.current) {
      authService.current.logout();
    } else {
      console.log("authService not initialized");
    }
  };

  const getUser = () => {
    authService.current!.getUser().then((user) => {
      if (user) {
        setAuthInfo(user);
      } else {
        console.log("you are not logged in");
      }
    });
  };

  const setAuthInfo = ({ id_token, profile, expires_at }: User) => {
    console.log((expires_at - new Date().getTime() / 1000) / 60);
    // @ts-ignore
    setAuthState({
      token: id_token,
      userInfo: profile,
      expiresAt: expires_at.toString(),
    });
  };
  return (
    <Provider
      value={{
        authState,
        login,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};
