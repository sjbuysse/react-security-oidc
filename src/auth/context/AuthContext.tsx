import React, { createContext, useEffect, useRef, useState } from "react";
import { Profile, User } from "oidc-client";
import { AuthService } from "../services/AuthService";

interface AuthState {
  token: string;
  expiresAt: number;
  userInfo: Profile;
}

interface IAuthContext {
  authState: AuthState | null;
  isAuthenticated: () => boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  authState: null,
  isAuthenticated: () => false,
  login: () => {},
  logout: () => {},
});
const { Provider } = AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authService = useRef<AuthService>();
  const [authState, setAuthState] = useState<AuthState | null>(null);

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
      setAuthState(null);
    } else {
      console.log("authService not initialized");
    }
  };

  const getUser = () => {
    authService.current!.getUser().then((user) => {
      if (user) {
        if (user.expired) {
          // zal enkel werken bij refresh in zelde tablad (sessionStorage...)
          authService
            .current!.renewToken()
            .catch((err) => authService.current!.removeUser());
        } else {
          setAuthInfo(user);
        }
      } else {
        console.log("you are not logged in");
      }
    });
  };

  const isAuthenticated = () => {
    if (!authState?.userInfo || !authState.expiresAt) {
      return false;
    }
    return new Date().getTime() / 1000 < authState.expiresAt;
  };

  const setAuthInfo = ({ id_token, profile, expires_at }: User) => {
    setAuthState({
      token: id_token,
      userInfo: profile,
      expiresAt: expires_at,
    });
  };
  return (
    <Provider
      value={{
        authState,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </Provider>
  );
};
