import React, { createContext, useEffect, useState } from "react";
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
    isInitialized: boolean;
    login: () => void;
    logout: () => void;
}

export const AuthContext = createContext<IAuthContext | undefined>(undefined);
export function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useCount must be used within a CountProvider");
    }
    return context;
}
const { Provider } = AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userManager] = useState(() => new UserManager(settings));
    const [authState, setAuthState] = useState<AuthState | null>(null);
    const [isInitialized, setIsInitialized] = useState<boolean>(false);

    useEffect(() => {
        loadUser().then(() => setIsInitialized(true));
    }, []);

    useEffect(() => {
        userManager.events.addAccessTokenExpiring(() => {
            renewToken();
        });
        userManager.events.addAccessTokenExpired(() => {
            renewToken();
        });
    }, []);

    const login = () => userManager.signinRedirect();

    const logout = () => {
        userManager.signoutRedirect();
        setAuthState(null);
    };

    const loadUser = () =>
        userManager.getUser().then((user) => {
            if (user && user.expired) {
                // will only work for refreshes.
                // Save the token in localStorage if you want it to work in a completely new tab also.
                return renewToken();
            } else if (user) {
                setAuthInfo(user);
            }
        });

    const renewToken = (): Promise<User | void> =>
        userManager
            .signinSilent()
            .then((user) => setAuthInfo(user))
            .catch((err) => userManager.removeUser());

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
                isInitialized,
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
