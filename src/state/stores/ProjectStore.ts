import { observable, makeObservable, action } from 'mobx'
import ServiceLocator from '../../ServiceLocator';
import { SERVICE_API_CLIENT, SERVICE_HTTP_CLIENT } from '../../services';

interface IProject {
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
   artefacts: any[]
}

export default class ProjectStore {

  public projectList: IProject[] = [];

  public currentOpenProject?: IProject;

  constructor(){
    makeObservable(this, {
      projectList: observable,
      currentOpenProject: observable,
      loadProjects: action
    })
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

  public async fetchProject(id: string){

    let apiClient = await ServiceLocator.get<SERVICE_API_CLIENT>(SERVICE_API_CLIENT);

    this.currentOpenProject = await apiClient.fetchProject(id); 
  }
}