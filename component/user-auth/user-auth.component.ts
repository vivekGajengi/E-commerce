import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login, signUp } from 'src/app/data-type';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css'],
})
export class UserAuthComponent implements OnInit {
  showLogin: boolean = true;
  constructor(private userservice: UserService, private router: Router) {}

  ngOnInit(): void {}

  signUp(data: signUp) {
    this.userservice.userSignUp(data).subscribe((result) => {
      console.log(result);
      if (result) {
        localStorage.setItem('users', JSON.stringify(result));
        this.router.navigate(['/']);
      }
    });
  }

  logIn(data: login) {
    this.userservice.userLogin(data);
  }
  openSignUp() {
    this.showLogin = false;
  }
  openLogin() {
    this.showLogin = true;
  }
}
