import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Environment } from 'src/environments/environment';
import { AuthResponseData, AuthService } from '../auth.service';
import { User } from '../user.model';
import * as AuthActions from './auth.action';

const handleAuthentication = (
  email: string,
  userId: string,
  token: string,
  expiresIn: string
) => {
  const date = new Date(new Date().getTime() + +expiresIn * 1000);
  const user = new User(email, userId, token, date);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: date,
  });
};

const handleError = (errorResponse: any) => {
  let errorMessage = 'An unknown error has occured';
  console.log(errorResponse);
  if (!errorResponse.error || !errorResponse.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
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
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  authLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
              Environment.firebaseApikey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((authData) => {
              this.authService.setLogoutTimer(+authData.expiresIn * 1000);
            }),
            map((authData) => {
              return handleAuthentication(
                authData.email,
                authData.localId,
                authData.idToken,
                authData.expiresIn
              );
            }),
            catchError((errorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    )
  );

  authSignup = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.SIGNUP_START),
      switchMap((authData: AuthActions.SignupStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
              Environment.firebaseApikey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true,
            }
          )
          .pipe(
            tap((authData) => {
              this.authService.setLogoutTimer(+authData.expiresIn * 1000);
            }),
            map((authData) => {
              return handleAuthentication(
                authData.email,
                authData.localId,
                authData.idToken,
                authData.expiresIn
              );
            }),

            catchError((errorResponse) => {
              return handleError(errorResponse);
            })
          );
      })
    )
  );

  authLogout = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.LOGOUT),
        tap(() => {
          this.authService.clearTokenTimeout()
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);

        })
      ),
    { dispatch: false }
  );

  autoLogin = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.AUTO_LOGIN),
      map(() => {
        const userData: {
          email: string;
          _token: string;
          id: string;
          _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));
        console.log(userData);
        if (!userData) {
          return { type: 'DUMMY' };
        } else {
          const user = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
          );
          if (user.token) {
            const expirationDuration =
              new Date(userData._tokenExpirationDate).getTime() -
              new Date().getTime();
            this.authService.setLogoutTimer(expirationDuration);
            return new AuthActions.AuthenticateSuccess({
              email: user.email,
              userId: user.id,
              token: user.token,
              expirationDate: new Date(userData._tokenExpirationDate),
            });
          }
          return { type: 'DUMMY' };
        }
      })
    )
  );
  authRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => {
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
