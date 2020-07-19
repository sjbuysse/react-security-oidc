import React from "react";
import { Header } from "./components";

export function App() {
  return (
    <div className="w-full h-full">
      <Header
        title="Hello, jworks!"
        handleClickMenuButton={() => console.log('the menu button was clicked')}
      ></Header>
    </div>
  );
}

export default App;
