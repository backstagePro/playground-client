import { store } from "../stores/RootStore";

export default class AbstractArtefact {

    protected getRunStore(){

        return store.runStore;
    }
} 