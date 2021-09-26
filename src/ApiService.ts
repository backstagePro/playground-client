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

  async fetchProject(id: string){

    let res = await this.client
            .getClient()
            .get(`projects/${id}`);

    return res.data.projectData;
  }
}