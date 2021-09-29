import { IArtefact } from "./IArteract";

export interface IServiceArtefact extends IArtefact {
  servicePath: string,
  artefactFilePath: string,
  runs: { [runId: string]: {name: string, id: string} }
}