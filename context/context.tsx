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
  toggle: boolean,
  setToggle: React.Dispatch<React.SetStateAction<boolean>>,
}

export const AppContext = createContext<AppContextValue>({
  list: [],
  setList: () => {},
  toggle: true,
  setToggle: () => {},
});

interface AppContextWrapperProps {
  children: ReactNode;
}

export function AppContextWrapper({ children }: AppContextWrapperProps) {
  const [list, setList] = useState<ListItem[]>([]);
  const [toggle, setToggle] = useState<boolean>(true);

  return (
    <AppContext.Provider
      value={{
        list,
        setList,
        toggle,
        setToggle
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
