import { createContext, useState } from "react";

export const SelectedSectionContext = createContext();
export const SelectedSectionProvider = ({ children }) => {
  const [forYouSelected, setForYouSelected] = useState(true);
  return (
    <SelectedSectionContext.Provider
      value={{ forYouSelected, setForYouSelected }}
    >
      {children}
    </SelectedSectionContext.Provider>
  );
};
