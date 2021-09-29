import { observable, makeObservable, action, computed } from 'mobx'
import ServiceLocator from '../../ServiceLocator';
import {  SERVICE_API_CLIENT  } from '../../services';
import { IArtefact } from '../artefacts/IArteract';
import ArtefactStore from './ArtefactStore';
import RunStore from './RunStore';


export interface IProject {
  /**
     * Absolute path to project
     */ 
   path: string, 

   /**
    * MongoId
    */
   _id: string,

   /**
    * ProjectArtefacts
    */
   artefacts: {[id: string]: IArtefact}
}

export default class ProjectStore {

  /**
   * List of all imported projects
   */
  public projectList: IProject[] = [];

  /**
   * Used to store the data for the project that has been opened currently in the 
   * project
   */
  public currentOpenProject?: IProject;

  private artefactStore: ArtefactStore;

  private runStore: RunStore;

  constructor( artefactStore: ArtefactStore, runStore: RunStore ){
    makeObservable(this, {
      projectList: observable,
      currentOpenProject: observable,
      getProjectNameFromPath: computed,
      loadProjects: action,
      deleteProject: action,
    });

    this.artefactStore = artefactStore;

    this.runStore = runStore;
  }

  get getProjectNameFromPath() : string {

    if(this.currentOpenProject){
      let split = this.currentOpenProject.path.split('/')
      return split[split?.length - 1];
    }

    return '';
  }

  /**
   * Load the list of all projects in the system.
   * 
   * @param projects 
   */
  public async loadProjects(){

    let apiClient = await ServiceLocator.get<SERVICE_API_CLIENT>(SERVICE_API_CLIENT);

    this.projectList = await apiClient.loadAllProjects();
  }

  /**
   * 
   * Fetch project by id, this will be the current opened project for the system.
   * 
   * @param id 
   */
  public async fetchProject(id: string){

    let apiClient = await ServiceLocator.get<SERVICE_API_CLIENT>(SERVICE_API_CLIENT);

    let {project , runs, artefacts } = await apiClient.fetchProject(id);

    this.currentOpenProject = project;

    // load artefacts
    this.artefactStore.setArtefacts(artefacts);
    this.runStore.setRuns(runs);

    this.runStore.setRuns(runs);
  }

  /**
   * Iterate trough artefact list of current opened project
   */
//   public forEachArtefact( cb: (artefact: IArtefact) => void ){
//     if(this.currentOpenProject){
//         Object.keys(this.currentOpenProject?.artefacts).forEach((id) => {
//             let ar = this.currentOpenProject?.artefacts[id];
         
//             cb(ar as IArtefact);
//       });
//     }
//   }

  public async deleteProject(id: string){

    let apiClient = await ServiceLocator.get<SERVICE_API_CLIENT>(SERVICE_API_CLIENT);

    await apiClient.deleteProject(id);
    
    await this.loadProjects();
  }

//   public getArtefactGroups(): {[groupName: string]: {count: number, artefacts: IArtefact[]}}{
//     let groups: {[groupName: string]: {count: number,  artefacts: IArtefact[]}} = {};

//     if(this.currentOpenProject !== void(0)){

//         this.forEachArtefact((artefact) => {
//             let group: any = artefact.group;

//             if(groups[group] === void(0)){
//                 groups[group] = {count: 1, artefacts: [artefact]};
//             } else {
//                 groups[group].count = groups[group].count + 1;
//                 groups[group].artefacts.push(artefact)
//             }
//         })
//     }

//     return groups;
//   }
}