import { IArtefact } from "../stores/ProjectStore";

export interface IServiceArtefact extends IArtefact {
  servicePath: string,
  artefactFilePath: string
}