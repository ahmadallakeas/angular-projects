import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  projectStatus = ['Stable', 'Critical', 'Finished'];
  projectForm: FormGroup;
  ngOnInit(): void {
    this.projectForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        this.nameValidator.bind(this),
      ]),
      email: new FormControl(
        null,
        Validators.required,
        this.emailValidator.bind(this)
      ),
      status: new FormControl(this.projectStatus[0]),
    });
  }
  onSubmit() {
    console.log(this.projectForm.value);
  }
  nameValidator(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { forbiddenName: true };
    }
    return null;
  }
  emailValidator(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value == 'ahmadallakeas@gmail.com') {
          resolve({ forbiddenEmail: true });
        } else resolve(null);
      }, 1500);
    });
    return promise;
  }
}
