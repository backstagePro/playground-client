
import { createContext, useContext } from 'react';
import ProjectStore from './ProjectStore';

export const store = {
  projectStore: new ProjectStore(),
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};