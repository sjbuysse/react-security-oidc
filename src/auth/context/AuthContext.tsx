import React, { createContext, useEffect, useRef, useState } from "react";
import { Profile, User, UserManager } from "oidc-client";
import { settings } from "../oidc-settings";

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
  const userManager = useRef<UserManager>();
  const [authState, setAuthState] = useState<AuthState | null>(null);

  useEffect(() => {
    userManager.current = new UserManager(settings);
    loadUser();
  }, []);

  const login = () => userManager.current!.signinRedirect();

  const logout = () => {
    userManager.current!.signoutRedirect();
    setAuthState(null);
  };

  const loadUser = () => {
    userManager.current!.getUser().then((user) => {
      if (user) {
        if (user.expired) {
          // zal enkel werken bij refresh in zelde tablad (sessionStorage...)
          renewToken();
        } else {
          setAuthInfo(user);
        }
      }
    });
  };

  const renewToken = (): Promise<User | void> =>
    userManager
      .current!.signinSilent()
      .then((user) => setAuthInfo(user))
      .catch((err) => userManager.current!.removeUser());

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
