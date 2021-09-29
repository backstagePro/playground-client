import {  observable, makeObservable, action, computed } from 'mobx';

interface IRun {
    artefactId: string
    name: string
    _id: string
}

export default class RunStore {

    /**
     * Contains artefcts for current fetched project
     */
    public runs: Array<IRun> = [];

    constructor(){

      makeObservable(this, {
          runs: observable,
          setRuns: action 
      });
    }

    /**
     * Set artefact for current loaded project
     * 
     * @param artefacts 
     */
    public setRuns( runs: any ){

        this.runs = runs;
    }

    public findRun(id: string){

        let found = this.runs.filter((run) => {
            if(run._id === id){
                return true;
            }

            return false;
        })

        return found.length ? found[0]: null;
        
    }

    public getRunsForArtefacts(artefactId: string){

        let found = this.runs.filter((run) => {
            if(run.artefactId === artefactId){
                return true;
            }

            return false;
        })

        return found.length ? found: [];
    }
}