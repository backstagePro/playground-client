import AbstractArtefact from "./AbstractArtefact";
import { IServiceArtefact } from "./IServiceArtefact";

interface IRun {
    name: string;
    id: string;
}

export default class FunctionalityArtefact extends AbstractArtefact {

    private artefact: IServiceArtefact;

    constructor( artefact: IServiceArtefact){
        super();
        this.artefact = artefact;
    }

    public forEachRun( cb: (run: IRun) => void ){

        Object.keys(this.artefact.runs).forEach((runId) => {
            cb(this.artefact.runs[runId])
        });
    }

    public getName(){

        return this.artefact.name
    }

    public getRun( runId: string ){

        let runStore = this.getRunStore()

        if(this.artefact.runs[runId]){
            return this.artefact.runs[runId];
        }

        return null;
    }
}