import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from 'src/app/data-type';
import { SellerService } from 'src/app/service/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css'],
})
export class SellerAuthComponent implements OnInit {
  registrationForm: any;
  showLogin = false;
  registrationlogin: any;
  authError: string = ' ';

  constructor(
    private fb: FormBuilder,
    private seller: SellerService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
    this.registrationlogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  sigUP(): void {
    const userData = this.registrationForm.value;
    console.log(this.registrationForm.value);
    this.seller.userSingUp(userData);
  }
  openlogin() {
    this.showLogin = true;
  }
  openSingup() {
    this.showLogin = false;
  }
  sigIn() {
    const loginData = this.registrationlogin.value;
    // console.log(this.registrationForm.value);
    this.seller.userLogin(loginData);
    this.seller.isLogginError.subscribe((isError) => {
      if (isError) {
        this.authError = 'Email or Password is not Correct';
      }
    });
  }
}
