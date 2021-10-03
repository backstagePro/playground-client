import {  observable, makeObservable, action, computed } from 'mobx';
import ServiceLocator from '../../ServiceLocator';
import { SERVICE_API_CLIENT, SERVICE_WEBSOCKET_CLIENT } from '../../services';

interface IRun {
    artefactId: string
    name: string
    _id: string
}

export default class RunStore {


    public currentRunFileData = null;

    /**
     * Contains artefcts for current fetched project
     */
    public runs: Array<IRun> = [];

    constructor(){

      makeObservable(this, {
          runs: observable,
          currentRunFileData: observable,
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

    public async startRunSesstion( runid: string ){

        let apiClient = await ServiceLocator.get<SERVICE_API_CLIENT>(SERVICE_API_CLIENT);

        let sessionData = await apiClient.startRun(runid);

        this.currentRunFileData = sessionData.fileMap;

        // create connection 

        const websocketClient = await ServiceLocator.get<SERVICE_WEBSOCKET_CLIENT>(SERVICE_WEBSOCKET_CLIENT)

        const socket = websocketClient.init('run-data');

        

    }
}