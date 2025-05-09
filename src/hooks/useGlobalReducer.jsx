//

import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore, getActions } from "../store";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [store, dispatch] = useReducer(storeReducer, initialStore());

  const actions = getActions(dispatch); // Acciones conectadas al dispatcher

  return (
    <StoreContext.Provider value={{ store, dispatch, actions }}>
      {children}
    </StoreContext.Provider>
  );
}

export default function useGlobalReducer() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useGlobalReducer debe usarse dentro de StoreProvider");
  return context;
}
