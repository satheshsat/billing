import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = '';
  token: any;

  constructor(private http: HttpClient, private storage: Storage) {
    
  }

  loadData(){
    
  }

  getToken(){
    if(this.token)
      return '?token=' + this.token;
    return '';
  }

  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }


    // Support easy query params for GET requests
    if (params || this.token) {
      reqOpts.params = new HttpParams();
      if (params){
        for (let k in params) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
      if(this.token)
        reqOpts.params = reqOpts.params.set('token', this.token);
    }

    return this.http.get(this.url + endpoint, reqOpts);
  }

  post(endpoint: string, body: any, reqOpts?: any) {
    return this.http.post(this.url + endpoint + this.getToken(), body, reqOpts);
  }

  put(endpoint: string, body: any, reqOpts?: any) {
    return this.http.put(this.url + endpoint + this.getToken(), body, reqOpts);
  }

  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + endpoint + this.getToken(), reqOpts);
  }

  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + endpoint + this.getToken(), body, reqOpts);
  }

  setToken(token){
    this.token = token;
  }
  
}