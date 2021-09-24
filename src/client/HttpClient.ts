import axios, { AxiosInstance } from 'axios';

export default class HttpClient {

  private client?: AxiosInstance;

  /**
   * Return axios instance for making requests to playground api
   * 
   * @returns 
   */
  getClient(): AxiosInstance {

    if(this.client){
      return this.client;
    }

    this.client = axios.create({
      baseURL: 'http://localhost:3001/'
    });

    return this.client;
  }
}