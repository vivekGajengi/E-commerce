import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { login, signUp } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SellerService {
  isSellerLoggedIn = new BehaviorSubject<boolean>(false);
  isLogginError = new EventEmitter(false);
  constructor(private http: HttpClient, private route: Router) {}

  userSingUp(userData: signUp) {
    this.http
      .post('http://localhost:3000/seller', userData, { observe: 'response' })
      .subscribe((result) => {
        this.isSellerLoggedIn.next(true);
        localStorage.setItem('seller', JSON.stringify(result));
        this.route.navigate(['seller-home']);
        console.log('result', result);
      });
  }

  userLogin(data: login) {
    console.log(data);
    this.http
      .get(
        `http://localhost:3000/seller?email=${data.email}&password=${data.password}`,
        { observe: 'response' }
      )
      .subscribe((result: any) => {
        console.log(result);
        if (result && result.body && result.body.length) {
          console.log('user logged In');
          localStorage.setItem('seller', JSON.stringify(result));
          this.route.navigate(['seller-home']);
        } else {
          console.log('login failed');
          this.isLogginError.emit(true);
        }
      });
  }
}
