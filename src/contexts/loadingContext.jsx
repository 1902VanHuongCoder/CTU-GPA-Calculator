import { createContext, useState } from "react";
import PropTypes from "prop-types";

LoadingProvider.propTypes = {
  children: PropTypes.node,
};
export const LoadingContext = createContext(false);
export default function LoadingProvider({children}) {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LoadingContext.Provider
      value={{ isLoading: isLoading, setIsLoading: setIsLoading }}
    >
      {children}
    </LoadingContext.Provider>
  );
}
