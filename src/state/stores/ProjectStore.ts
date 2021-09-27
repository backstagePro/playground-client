import { observable, makeObservable, action, computed } from 'mobx'
import ServiceLocator from '../../ServiceLocator';
import { SERVICE_API_CLIENT, SERVICE_HTTP_CLIENT } from '../../services';

export interface IArtefact {
   /**
    * Name of the group
    */
    group: string,

    /**
     * Custom name to be shown
     */
    name: string;
}

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
   artefacts: {[groupName: string]: IArtefact[]}
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

  constructor(){
    makeObservable(this, {
      projectList: observable,
      currentOpenProject: observable,
      getProjectNameFromPath: computed,
      loadProjects: action,
      deleteProject: action,
    })
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

  public async fetchProject(id: string){

    let apiClient = await ServiceLocator.get<SERVICE_API_CLIENT>(SERVICE_API_CLIENT);

    this.currentOpenProject = await apiClient.fetchProject(id); 
  }

  public async deleteProject(id: string){

    let apiClient = await ServiceLocator.get<SERVICE_API_CLIENT>(SERVICE_API_CLIENT);

    await apiClient.deleteProject(id);
    
    await this.loadProjects();
  }
}