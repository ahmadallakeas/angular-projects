import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthResponseData, AuthService } from './auth.service';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.action';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit,OnDestroy {
  isLoginMode = true;
  isLoading = false;
  errorMessage: string = null;
  @ViewChild('form') form: NgForm;
  @ViewChild(PlaceholderDirective, { static: false })
  placeholder: PlaceholderDirective;
  private storeSub:Subscription
  constructor(
    private authService: AuthService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
  ngOnDestroy(): void {
    this.storeSub.unsubscribe()
  }

  ngOnInit(): void {
    this.storeSub=this.store.select('auth').subscribe({
      next: (authState) => {
        console.log(authState)
        this.errorMessage = authState.errorMessage;
        this.isLoading = authState.loading;
        if (this.errorMessage) {
          this.showErrorAlert(this.errorMessage);
        }
      },
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit() {
    if (!this.form.valid) {
      return;
    }
    const email = this.form.value.email;
    const password = this.form.value.password;
    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: password })
      );
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({ email: email, password: password })
      );
    }

    // authObservable.subscribe({
    //   next: (response) => {
    //     console.log(response);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   error: (error) => {
    //     this.isLoading = false;
    //     this.errorMessage = error;
    //     this.showErrorAlert(error);
    //   },
    // });
  }
  private showErrorAlert(error: string) {
    const containerRef = this.placeholder.viewContainerRef;
    containerRef.clear();
    const component = containerRef.createComponent(AlertComponent);
    component.instance.message = error;
    const event = component.instance.closed.subscribe(() => {
      event.unsubscribe();
      containerRef.clear();
    });
  }
  onCloseError() {
    this.store.dispatch(new AuthActions.ClearError())
  }
}
