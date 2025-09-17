"use client";
import { createContext, useContext, useState } from "react";

const contx = createContext<any>(null);


export function LayoutContextProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);


  const values = {
  
    sidebarOpen,
    setSidebarOpen,
   
  };

  return <contx.Provider value={values}>{children}</contx.Provider>;
}

export function useLayoutContx() {
  return useContext(contx);
}
