
import { createContext, useContext } from 'react';
import ArtefactStore from './ArtefactStore';
import ProjectStore from './ProjectStore';
import RunStore from './RunStore';

const runStore = new RunStore();
const artefactStore = new ArtefactStore();
const projectStore = new ProjectStore(artefactStore, runStore);

export const store = {
  projectStore,
  artefactStore,
  runStore
};

export const StoreContext = createContext(store);

export const useStore = () => {
  return useContext(StoreContext);
};