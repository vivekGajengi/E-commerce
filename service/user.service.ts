import { Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  router: any;
  constructor(private http: HttpClient) {}

  userSignUp(user: signUp): Observable<any> {
    return this.http.post('http://localhost:3000/users', user);
  }

  userLogin(data: login) {
    this.http
      .get<signUp[]>(
        `http://localhost:3000/users?email=${data.email}.com&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result) => {
        if (result) {
          console.log(result);
        }
      });
  }
}
