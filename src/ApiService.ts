import { SERVICE_HTTP_CLIENT } from "./services";

export default class ApiService {
  
  private client: SERVICE_HTTP_CLIENT;

  constructor(client: SERVICE_HTTP_CLIENT){

    this.client = client;
  }

  async loadAllProjects(){

    let res = await this.client
            .getClient()
            .get('projects');

    return res.data.allProjects;
  }

  async deleteProject(id: string){
    let res = await this.client
            .getClient()
            .delete(`project/delete/${id}`);

    return {
      success: res.data.success
    }
  }

  async importProject(path: string){
    let res = await this.client
            .getClient()
            .post(`project/import`, {
              projectPath: path
            });

    return {
      project: res.data.project,
      artefacts: res.data.artefacts
    }
  }

  async fetchProject(id: string){

    let res = await this.client
            .getClient()
            .get(`projects/${id}`);

    return res.data.projectData;
  }

  async startRun(id: string){
    let res = await this.client
        .getClient()
        .post(`/run/start`, {
            runId: id
        });

    return res.data;
  }
}