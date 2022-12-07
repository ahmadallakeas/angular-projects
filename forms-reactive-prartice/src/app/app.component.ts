import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forbiddenUsernames = ['Test', 'Test1'];
  signupForm: FormGroup;
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.usernameForbidden.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.email, Validators.required],
          [this.emailForbidden]
        ),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
    // this.signupForm.valueChanges.subscribe(
    //   {
    //     next:(value)=>
    //     {
    //       console.log(value)
    //     }
    //   }
    // )
    this.signupForm.statusChanges.subscribe({
      next: (status) => {
        console.log(status);
      },
    });
    this.signupForm.setValue({
      userData: {
        username: 'ahmad',
        email: 'ahmadallakeas@gmail.com',
      },
      gender: 'male',
      hobbies: [],
    });
    this.signupForm.patchValue({
      userData: {
        username: 'mrreaper72',
      },
    });
  }
  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }
  usernameForbidden(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {
        usernameIsForbidden: true,
      };
    }
    return null;
  }
  emailForbidden(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'test@test.com') {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 1500);
    });
    return promise;
  }
}
