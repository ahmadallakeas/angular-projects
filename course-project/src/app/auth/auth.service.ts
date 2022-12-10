import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, Subject, tap, throwError } from 'rxjs';
import { User } from './user.model';

export interface AuthResponseData {
  idToken: string;
  expiresIn: string;
  email: string;
  localId: string;
  refreshToken: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  tokenTimer: any;
  constructor(private http: HttpClient, private router: Router) {}

  signup(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBhrLW6AMJANhOzhcMgBNobyMe_fWSpZ1c',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.createUser(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            responseData.expiresIn
          );
        })
      );
  }
  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBhrLW6AMJANhOzhcMgBNobyMe_fWSpZ1c',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((responseData) => {
          this.createUser(
            responseData.email,
            responseData.localId,
            responseData.idToken,
            responseData.expiresIn
          );
        })
      );
  }
  logout() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
      this.tokenTimer = null;
    }
    this.router.navigate(['/auth']);
  }

  autoLogout(expirationDuration: number) {
    this.tokenTimer = setTimeout(() => this.logout(), expirationDuration);
  }

  autoLogin() {
    const userData: {
      email: string;
      _token: string;
      id: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    console.log(userData);
    if (!userData) {
      return;
    } else {
      const user = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (user.token) {
        const expirationDate =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.user.next(user);
        this.autoLogout(expirationDate);
      }
    }
  }
  private createUser(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) {
    const date = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, date);
    localStorage.setItem('userData', JSON.stringify(user));
    this.user.next(user);
    this.autoLogout(+expiresIn * 1000);
  }
  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error has occured';
    console.log(errorResponse);
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(() => errorMessage);
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS': {
        errorMessage = 'This email already exists';
        break;
      }
      case 'INVALID_EMAIL': {
        errorMessage = 'This email is invalid';
        break;
      }
      case 'EMAIL_NOT_FOUND': {
        errorMessage = 'This email does not exist';
        break;
      }
      case 'INVALID_PASSWORD': {
        errorMessage = 'Incorrect password';
        break;
      }
    }
    return throwError(() => errorMessage);
  }
}
