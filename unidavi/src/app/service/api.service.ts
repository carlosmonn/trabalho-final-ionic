import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getDadosApi(url) {
    return this.http.get(`${API_URL}${url}`);
  }

  postDadosApi(url, dados) {
    return this.http.post(`${API_URL}${url}`, dados);
  }
}
