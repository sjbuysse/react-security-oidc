import React, { useContext, useState } from "react";
import {
  Sidenav,
  SidenavContainer,
  SidenavContent,
  Header,
  NavItems,
} from "./components";
import { Switch, Route } from "react-router-dom";
import { Routes } from "./routes";
import { ClientsPage } from "./clients";
import { ProductsPage } from "./products/pages";
import { AuthContext } from "./auth/context/AuthContext";
import { AuthenticatedRoute } from "./auth/components/AuthenticatedRoute/AuthenticatedRoute";
import { Login } from "auth/components/Login/Login";

const navItems = [
  {
    name: "products",
    route: Routes.PRODUCTS,
  },
];

const authenticatedNavItems = [
  ...navItems,
  {
    name: "clients",
    route: Routes.CLIENTS,
  },
];

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { authState, isAuthenticated, login, logout } = useContext(AuthContext);

  return (
    <div className="w-full h-full flex flex-col">
      <Header
        title="Jworks base app"
        login={login}
        logout={logout}
        userInfo={authState?.userInfo}
        handleClickMenuButton={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-1 flex-auto">
        <SidenavContainer>
          <Sidenav isSidenavOpen={isSidebarOpen}>
            <NavItems
              navItems={isAuthenticated() ? authenticatedNavItems : navItems}
            />
          </Sidenav>
          <SidenavContent>
            <Switch>
              <Route path={Routes.PRODUCTS}>
                <ProductsPage />
              </Route>
              <AuthenticatedRoute path={Routes.CLIENTS}>
                <ClientsPage />
              </AuthenticatedRoute>
              <Route path={Routes.LOGIN}>
                <Login />
              </Route>
            </Switch>
          </SidenavContent>
        </SidenavContainer>
      </div>
    </div>
  );
}

export default App;
