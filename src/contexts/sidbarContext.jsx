import { createContext, useState } from "react";
import PropTypes from "prop-types";

SidebarProvider.propTypes = {
  children: PropTypes.node,
};
export const SidebarContext = createContext(false);
export default function SidebarProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ isOpen: isOpen, setIsOpen: setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}
