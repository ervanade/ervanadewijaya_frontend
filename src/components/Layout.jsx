import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col"> 

      <Navbar /> 
      
      <div className="flex flex-1"> 
        
        <Sidebar />

        <main className="flex-1 p-6 overflow-y-auto">

          <Outlet />
        </main>
      </div>
    </div>
  );
}