import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
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
  @ViewChild(PlaceholderDirective, { static: false })
  placeholder: PlaceholderDirective;

  constructor(
    private authService: AuthService,
    private router: Router,
    private viewContainerRef: ViewContainerRef
  ) {}

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
        this.showErrorAlert(error);
      },
    });
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
    this.errorMessage = null;
  }
}
