import { createContext, useState, ReactNode } from "react";

interface ListItem {
  _id: string;
  text: string;
  answer: string;
  likes: number;
}

interface AppContextValue {
  list: ListItem[];
  setList: React.Dispatch<React.SetStateAction<ListItem[]>>;
}

export const AppContext = createContext<AppContextValue>({
  list: [],
  setList: () => {}
});

interface AppContextWrapperProps {
  children: ReactNode;
}

export function AppContextWrapper({ children }: AppContextWrapperProps) {
  const [list, setList] = useState<ListItem[]>([]);

  return (
    <AppContext.Provider
      value={{
        list,
        setList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
