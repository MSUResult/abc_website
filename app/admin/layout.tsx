import SideBar from "@/components/(admin)/SideBar";
import Navbar from "../../components/(admin)/Navbar";

import React from "react";

const layout = ({ children }) => {
  return (
    <main className="flex h-screen">
      <SideBar />

      <div className="flex flex-1 flex-col ">
        <Navbar />
        {children}
      </div>
    </main>
  );
};

export default layout;
