import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  listAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/colaborador`);
  }

  getPostById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/posts/${id}`);
  }

  salvarUsuario(nome: any, senha: any): Observable<any> {
    var body = {"nome": nome, "senha": senha}

    console.log(body)

    return this.http.post(`${this.apiUrl}/colaborador`, body);
  }

  salvarAssociaChefeSubordinado(chefe: any, subordinado: any): Observable<any> {
    var body = {"idChefe": chefe, "idSubordinado": subordinado}

    console.log(body)

    return this.http.post(`${this.apiUrl}/colaborador/associa-chefe`, body);
  }

  updatePost(id: number, post: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/posts/${id}`, post);
  }

  deletePost(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/posts/${id}`);
  }
}
