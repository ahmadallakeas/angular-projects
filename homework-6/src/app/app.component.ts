import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('form') form;
  subscriptions = ['Basic', 'Advanced', 'Pro'];
  user = {
    email: '',
    password: '',
    subscription: '',
  };
  submitted = false;
  onSubmit() {
    this.user.email =this.form.value.email
    this.user.password =this.form.value.password
    this.user.subscription =this.form.value.subscription
     this.submitted = true;
  }
}
