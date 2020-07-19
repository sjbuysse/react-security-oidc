import React, { useState } from "react";
import { Header } from "./components";
import { Sidenav, SidenavContainer, SidenavContent } from './components/Sidenav/Sidenav';

export function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
    return (
        <div className="w-full h-full">
            <Header title='Jworks base app' handleClickMenuButton={() => setIsSidebarOpen(!isSidebarOpen)} />
            <SidenavContainer>
                <Sidenav isSidenavOpen={isSidebarOpen}>
                    <div>Item 1</div>
                    <div>Item 1</div>
                </Sidenav>
                <SidenavContent>
                </SidenavContent>
            </SidenavContainer>
        </div>
    );
}

export default App;
