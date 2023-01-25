import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerOption {
  label: string;
  path: string;
}

interface IDrawerContextData {
  drawerOptions: IDrawerOption[];
  isDrawerOpen: boolean;
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
  toggleDrawerOpen: () => void;
}

interface DrawerProviderProps {
  children: React.ReactNode
}

const DrawerContext = createContext({} as IDrawerContextData);

export const useDrawerContext = () => {
  return useContext(DrawerContext);
};

export const DrawerProvider: React.FC<DrawerProviderProps> = ({ children }) => {
  const [drawerOptions, setDrawerOptions] = useState<IDrawerOption[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerOpen = useCallback(() => {
    setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
  }, []);

  const handleSetDrawerOptions = useCallback((newDrawerOptions: IDrawerOption[]) => {
    setDrawerOptions(newDrawerOptions);
  }, []);

  return (
    <DrawerContext.Provider value={{ drawerOptions, isDrawerOpen, setDrawerOptions: handleSetDrawerOptions, toggleDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
};