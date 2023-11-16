import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Student } from '../models/student';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TestServiceService {

  private url = 'https://backend-idra-production.up.railway.app/student';

  constructor(private http: HttpClient) { } 
  getAll(): Observable <any> { 
    return this.http.get(this.url + "/getAll") 
  }

  add(s: Student): Observable <any>{ 
    return this.http.post(this.url, s)
  }

  update(s: Student): Observable <any>{
    return this.http.post(this.url + '/' + s.id + '/update',s)
  }

  delete(id: number): Observable <any>{
    return this.http.post(this.url + '/' + id + '/delete', null)
    
  }

}
