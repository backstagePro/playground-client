
import {  observable, makeObservable, action, computed } from 'mobx';
import FunctionalityArtefacts from '../../../pages/artefacts/functionality/[projectid]';
import FunctionalityArtefact from '../artefacts/FunctionalityArtefact';
import { IArtefact } from '../artefacts/IArteract';

export default class ArtefactStore {

    /**
     * Contains artefcts for current fetched project
     */
    public artefacts: IArtefact[] = [];

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

    public getGroups(): {[groupName: string]: { count: number, artefacts: IArtefact[]}} {

        let groups: {[groupName: string]: { count: number, artefacts: IArtefact[]}} = {};

        this.artefacts.forEach((art) => {

            if(groups[art.group] === void(0)){
                groups[art.group] = {
                    count: 1,
                    artefacts: [art]
                }
            } else {
                groups[art.group].count += 1;
                groups[art.group].artefacts.push(art);
            }

        });

        return groups;

    }

    /**
     * Find artefact by id
     * 
     * @param id 
     * @returns 
     */
    public getArtefact(id: string){

        let found = this.artefacts.filter((art) => {
            if(art._id === id){
                return true;
            }

            return false;
        })

        return found.length ? found[0] : null;
    }
}