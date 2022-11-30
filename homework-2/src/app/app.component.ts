import { Component } from "@angular/core";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project-template';
  username:string=''


  onClick()
  {
    this.username=''
  }
  isDisabled()
  {
    return this.username.length==0;
  }
}
