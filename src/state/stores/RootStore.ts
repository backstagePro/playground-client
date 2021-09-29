
import { createContext, useContext } from 'react';
import ArtefactStore from './ArtefactStore';
import ProjectStore from './ProjectStore';

const artefactStore = new ArtefactStore();
const projectStore = new ProjectStore(artefactStore);

export const store = {
  projectStore,
  artefactStore
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};