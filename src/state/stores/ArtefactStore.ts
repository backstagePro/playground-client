
import {  observable, makeObservable, action, computed } from 'mobx';
import FunctionalityArtefacts from '../../../pages/artefacts/functionality/[projectid]';
import FunctionalityArtefact from '../artefacts/FunctionalityArtefact';
import { IArtefact } from '../artefacts/IArteract';

export default class ArtefactStore {

    /**
     * Contains artefcts for current fetched project
     */
    public artefacts: { [artefactId: string]: IArtefact} = {};

    constructor(){

      makeObservable(this, {
          artefacts: observable,
          setArtefacts: action 
      });
    }

    /**
     * Set artefact for current loaded project
     * 
     * @param artefacts 
     */
    public setArtefacts( artefacts: any ){

        this.artefacts = artefacts;
    }

    /**
     * Find artefact by id
     * 
     * @param id 
     * @returns 
     */
    public getArtefact(id: string){

        if(this.artefacts[id]){

            let ar = this.artefacts[id];
            if(ar.group === 'functionality'){
                return new FunctionalityArtefact(ar as any);
            }

            return this.artefacts[id];
        }

        return null;
    }
}