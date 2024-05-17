import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { SellerAuthComponent } from './seller-auth.component';
import { ReactiveFormsModule, FormBuilder, FormControl } from '@angular/forms';
import { SellerService } from 'src/app/service/seller.service';
import { BehaviorSubject } from 'rxjs';

fdescribe('SellerAuthComponent', () => {
  let component: SellerAuthComponent;
  let fixture: ComponentFixture<SellerAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [FormBuilder],
      declarations: [SellerAuthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SellerAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  describe('First name validation', () => {
    it('Form should be invalid', () => {
      let name = component.registrationForm.controls['name'];
      expect(name.valid).toBeFalsy();
    });
    it('Form should be valid', () => {
      let name = component.registrationForm.controls['name'];
      name.setValue('name');
      expect(name.valid).toBeTruthy();
    });
  });

  it('Reactive Form validation -Check Invalid email address', () => {
    let email = component.registrationForm.controls['email'];
    email.setValue('emailaddress');
    expect(email.valid).toBeFalsy();
  });
  it('Reactive Form validation -Check valid email address', () => {
    let email = component.registrationForm.controls['email'];
    email.setValue('emailaddress@gmail.com');
    expect(email.valid).toBeTruthy();
  });
  it('password field validity', () => {
    let password = component.registrationForm.controls['password'];
    expect(password.valid).toBeFalsy();
  });
  it('password field validity - check valid password', () => {
    let password = component.registrationForm.controls['password'];
    password.setValue('12345');
    expect(password.valid).toBeFalsy();
  });
  it('Reactive  login Form  validation -Check Invalid email address', () => {
    let email = component.registrationlogin.controls['email'];
    email.setValue('emailaddress');
    expect(email.valid).toBeFalsy();
  });
  it('Reactive  login  Form validation -Check valid email address', () => {
    let email = component.registrationlogin.controls['email'];
    email.setValue('emailaddress@gmail.com');
    expect(email.valid).toBeTruthy();
  });
  it(' registrationlogin password field validity', () => {
    let password = component.registrationlogin.controls['password'];
    expect(password.valid).toBeFalsy();
  });
  it(' registrationlogin password field validity - check valid password', () => {
    let password = component.registrationlogin.controls['password'];
    password.setValue('12345');
    expect(password.valid).toBeFalsy();
  });
  it('rective Form validation -Form submited  Check', () => {
    expect(component.registrationForm.Invalid).toBeFalsy();
  });
  it('should call  sigUP() method when form is submitted', () => {
    spyOn(component, 'sigUP');
    const form = fixture.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    fixture.detectChanges();
    expect(component.sigUP).toHaveBeenCalled();
  });
  it('should set showLogin to true when openlogin() is called', () => {
    component.openlogin();
    expect(component.showLogin).toBe(true);
  });
  it('should set showLogin to false when openSignup() is called', () => {
    component.showLogin = true;
    component.openSingup();
    expect(component.showLogin).toBe(false);
  });
  describe('SigUp My Form', () => {
    let component: SellerAuthComponent;
    let fixture: ComponentFixture<SellerAuthComponent>;
    let sellerServiceSpy: jasmine.SpyObj<SellerService>;
    beforeEach(async () => {
      const sellerServiceStub = jasmine.createSpyObj('SellerService', [
        'userSingUp',
      ]);

      await TestBed.configureTestingModule({
        declarations: [SellerAuthComponent],
        imports: [ReactiveFormsModule],
        providers: [{ provide: SellerService, useValue: sellerServiceStub }],
      }).compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(SellerAuthComponent);
      component = fixture.componentInstance;
      sellerServiceSpy = TestBed.inject(
        SellerService
      ) as jasmine.SpyObj<SellerService>;
      fixture.detectChanges();
    });
    it('should call userSignUp method with form data', () => {
      const userData = {
        name: 'testUser',
        password: '123445',
        email: 'vivek@gmil.com',
      };
      component.registrationForm = new FormControl(userData); // Assuming registrationForm is a form control

      component.sigUP();

      expect(sellerServiceSpy.userSingUp).toHaveBeenCalledWith(userData);
    });
  });
});
