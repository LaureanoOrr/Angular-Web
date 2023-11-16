import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Student } from '../models/student';


@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  //             https://backend-idra-production.up.railway.app/student/getAll ////2/11/23
  private url = 'https://backend-idra-production.up.railway.app/student';

  constructor(private http: HttpClient) { } //agregamos el cliente http dentro del constructor

  getAll(): Observable <any> { //Agregamos el tipo de dato que devuelve la funcion (un observable, que es una promesa)
    return this.http.get(this.url + "/getAll") // /getAll
  }

  add(s: Student): Observable <any>{ //pasar objeto
    return this.http.post(this.url, s)
  }

  update(s: Student): Observable <any>{
    return this.http.post(this.url + '/' + s.id + '/update',s)
  }

  delete(s: Student): Observable <any>{
    return this.http.post(this.url + '/' + s.id + '/update',null)
    
  }

  


























  /*
  getById (id : number): Observable<any> {
    return this.http.get(this.url + '/' + id)
  }

  getAll(): Observable<any>{
    return this.http.get(this.url + '/getAll')
  }

  save(Student: any): Observable <any> {
    return this.http.post(this.url , Student )
  }

  update (id: number, student: any ): Observable <any> {
    return this.http.post (this.url + "/"  + id + "/update", student)
  }
   
  delete (id: number, Student: any): Observable <any>{
    return this.http.post(this.url + "/" + id + "delete" , null)
  }
  */
  
}
