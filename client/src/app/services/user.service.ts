import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseurl = 'http://localhost:8000/user';
  static signin: any;
  constructor(private http: HttpClient) {}
  signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ): Observable<any> {
    return this.http.post('http://localhost:8000/user/signup', {
      firstName,
      lastName,
      email,
      password,
    });
  }
  signin(email: string, password: string):Observable <any> {
    return this.http.post('http://localhost:8000/user/signin', {
      email,
      password
    });
  }
}