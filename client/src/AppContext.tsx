import React, {
  createContext,
  useContext,
  useState,
  PropsWithChildren,
} from "react";

interface AppContextData {
  selectedCountry?: string;
  setSelectedCountry: (code: string) => void;
  tabIndex: number;
  setTabIndex: (index: number) => void;
}

const AppContext = createContext<AppContextData | undefined>(undefined);

export const AppContextProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const [mapSelectedCountry, setMapSelectedCountry] = useState<
    string | undefined
  >();
  const [tabIndex, setTabIndex] = useState(0);

  const values: AppContextData = {
    selectedCountry: mapSelectedCountry,
    setSelectedCountry: setMapSelectedCountry,
    tabIndex: tabIndex,
    setTabIndex: setTabIndex,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a AppContextProvider");
  }
  return context;
};
