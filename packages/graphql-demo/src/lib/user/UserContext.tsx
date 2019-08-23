import { merge } from "lodash";
import React, { useContext } from "react";

const SESSION_STORAGE_KEY = "rcfr.rc-et-moi";

type IContextUpdater = (newState: Partial<IUserStore>) => void;

interface IUserStore {
  userToken?: string | null;
}

export interface IUserContext extends IUserStore {
  updateState: IContextUpdater;
}

const storageRead = (): IUserStore => {
  const str =
    typeof window !== "undefined" &&
    window.localStorage.getItem(SESSION_STORAGE_KEY);
  return str ? JSON.parse(str) || {} : {};
};
const storageWrite = (newState: IUserStore) => {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(newState));
  }
};

const defaultState = storageRead();

export const useUserContext = () => useContext(userContext);

export const userContext = React.createContext<IUserContext>(
  ({} as any) as IUserContext,
);

export type IUserContextProviderProps = Omit<
  React.ProviderProps<IUserContext>,
  "value"
>;
export const UserContextProvider = (props: IUserContextProviderProps) => {
  const [state, setState] = React.useState<IUserStore>(defaultState || {});

  React.useEffect(() => {
    storageWrite(state);
  }, [state]);

  return (
    <userContext.Provider
      value={{
        ...state,
        updateState: data => {
          setState(currentState => ({
            ...merge({ ...currentState }, { ...data }),
          }));
        },
      }}
      {...props}
    />
  );
};
