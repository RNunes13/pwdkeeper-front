
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface ApiOptions {
}

export default class Api {
  protected instance: AxiosInstance;
  protected readonly jsonHeaders = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };

  constructor(options: ApiOptions = {}) {
    const protocol = process.env.API_PROTOCOL;
    const host = process.env.API_HOST;
    const port = process.env.API_PORT;

    console.log('protocol', protocol);
    console.log('host', host);
    
    if (!protocol || !host)  new Error('API host and protocol not found. Check the environment variables.');
    
    const baseURL = `${protocol}://${host}${port ? (':' + port) : ''}/api`;
    console.log('baseUrl', baseURL);

    this.instance = axios.create({
      baseURL,
      headers: {
        ...this.jsonHeaders,
      },
    });
  }

  public get(url: string, options: AxiosRequestConfig = {}) {
    return this.instance.get(url, options);
  }

  public post(url: string, data?: any, options: AxiosRequestConfig = {}) {
    return this.instance.post(url, data, options);
  }

  public put(url: string, data?: any, options: AxiosRequestConfig = {}) {
    return this.instance.put(url, data, options);
  }

  public delete(url: string, options: AxiosRequestConfig = {}) {
    return this.instance.delete(url, options);
  }
}
