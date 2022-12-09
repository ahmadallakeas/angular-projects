import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  @ViewChild('form') form: NgForm;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    let authObservable: Observable<AuthResponseData>;
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password);
    } else {
      authObservable = this.authService.signup(email, password);
    }
    authObservable.subscribe({
      next: (response) => {
        console.log(response);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = error;
      },
    });
  }
}
