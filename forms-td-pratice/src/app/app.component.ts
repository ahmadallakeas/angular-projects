import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  @ViewChild('form') form: NgForm;
  defaultQuestion = 'pet';
  answer = '';
  genders = ['Male', 'Female'];
  user = {
    username: '',
    email: '',
    question: '',
    answer: '',
    gender: '',
  };
  submitted=false
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.form.setValue({
    //   userData: {
    //     username: suggestedName,
    //     email: '',
    //   },
    //   secret: 'pet',
    //   questionAnswer: '',
    //   gender: 'male',
    // });
    this.form.form.patchValue({
      userData: {
        username: suggestedName,
      },
    });
    console.log();
  }
  // onSubmit(form:NgForm)
  // {
  //   console.log(form.controls['email'].value)
  // }
  onSubmit() {

    this.user.username=this.form.value.userData.username
    this.user.email=this.form.value.userData.email
    this.user.question=this.form.value.secret
    this.user.answer=this.form.value.questionAnswer
    this.user.gender=this.form.value.gender
    this.submitted=true
    this.form.resetForm()
  }
}
