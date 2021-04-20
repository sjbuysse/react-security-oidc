import React, { useContext, useEffect, useRef, useState } from "react";
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
import { AuthService } from "./auth/services/AuthService";
import { AuthContext } from "./auth/context/AuthContext";

const navItems = [
  {
    name: "products",
    route: Routes.PRODUCTS,
  },
  {
    name: "clients",
    route: Routes.CLIENTS,
  },
];

export function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const { authState, login, logout } = useContext(AuthContext);
  return (
    <div className="w-full h-full flex flex-col">
      <Header
        title="Jworks base app"
        login={login}
        logout={logout}
        userInfo={authState.userInfo}
        handleClickMenuButton={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      <div className="flex flex-1 flex-auto">
        <SidenavContainer>
          <Sidenav isSidenavOpen={isSidebarOpen}>
            <NavItems navItems={navItems} />
          </Sidenav>
          <SidenavContent>
            <Switch>
              <Route path={Routes.PRODUCTS}>
                <ProductsPage />
              </Route>
              <Route path={Routes.CLIENTS}>
                <ClientsPage />
              </Route>
            </Switch>
          </SidenavContent>
        </SidenavContainer>
      </div>
    </div>
  );
}

export default App;
