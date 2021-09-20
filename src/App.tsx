import React, {useState} from "react";
import {
    Sidenav,
    SidenavContainer,
    SidenavContent,
    Header,
    NavItems,
} from "./components";
import {Switch, Route} from "react-router-dom";
import {Routes} from "./routes";
import {ClientsPage} from "./clients";
import {ProductsPage} from "./products/pages";
import {useAuth} from "./auth/contexts/AuthContext";
import {AuthenticatedRoute} from "./auth/components/AuthenticatedRoute/AuthenticatedRoute";
import {Login} from "./auth/components/Login/Login";

const navItems = [
    {
        name: "login",
        route: Routes.LOGIN,
    },
];

const authenticatedNavItems = [
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
    const {isAuthenticated, isInitialized} = useAuth();

    return (
        <div className="w-full h-full flex flex-col">
            <Header
                title="Jworks base app"
                handleClickMenuButton={() => setIsSidebarOpen(!isSidebarOpen)}
            />
            <div className="flex flex-1 flex-auto">
                <SidenavContainer>
                    <Sidenav isSidenavOpen={isSidebarOpen}>
                        <NavItems navItems={isAuthenticated() ? authenticatedNavItems : navItems}/>
                    </Sidenav>
                    <SidenavContent>
                        {isInitialized && (
                            <Switch>
                                <AuthenticatedRoute
                                    path={Routes.PRODUCTS}
                                    redirectRoute={Routes.LOGIN}
                                >
                                    <ProductsPage/>
                                </AuthenticatedRoute>
                                <AuthenticatedRoute
                                    path={Routes.CLIENTS}
                                    redirectRoute={Routes.LOGIN}
                                >
                                    <ClientsPage/>
                                </AuthenticatedRoute>
                                <Route path={Routes.LOGIN}>
                                    <Login/>
                                </Route>
                            </Switch>
                        )}

                    </SidenavContent>
                </SidenavContainer>
            </div>
        </div>
    );
}

export default App;
