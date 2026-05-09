"use client";
 
import { createContext, useContext, useState } from "react";
 
type NavColorCtx = {
  logoColor: string;
  setLogoColor: (color: string) => void;
};
 
const NavColorContext = createContext<NavColorCtx>({
  logoColor: "#000000",
  setLogoColor: () => {},
});
 
export function NavColorProvider({ children }: { children: React.ReactNode }) {
  const [logoColor, setLogoColor] = useState("#000000");
 
  return (
    <NavColorContext.Provider value={{ logoColor, setLogoColor }}>
      {children}
    </NavColorContext.Provider>
  );
}
 
export const useNavColor = () => useContext(NavColorContext);