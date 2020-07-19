import React, { useState } from "react";
import { Sidenav, SidenavContainer, SidenavContent, Header, NavItems } from './components';
import { Switch, Route } from "react-router-dom";
import { Routes } from './routes';

const navItems = [{
    name: 'products',
    route: Routes.PRODUCTS
}, {
    name: 'clients',
    route: Routes.CLIENTS
}];

export function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    return (
        <div className="w-full h-full flex flex-col">
            <Header title='Jworks base app' handleClickMenuButton={() => setIsSidebarOpen(!isSidebarOpen)}/>
            <div className="flex flex-1 flex-auto">
            <SidenavContainer>
                <Sidenav isSidenavOpen={isSidebarOpen}>
                    <NavItems navItems={navItems}/>
                </Sidenav>
                <SidenavContent>
                    <Switch>
                        <Route path={Routes.PRODUCTS}>
                            Here comes the products page
                        </Route>
                        <Route path={Routes.CLIENTS}>
                            Here comes the clients page
                        </Route>
                    </Switch>
                </SidenavContent>
            </SidenavContainer>
            </div>
        </div>
    );
}

export default App;
