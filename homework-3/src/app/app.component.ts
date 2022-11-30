import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  display = false;
  clicks:number[]=[]
  onClick(event: Event)
  {
    this.display=!this.display
    this.clicks.push(event.timeStamp)
    console.log(this.clicks)
  }
  getColor(i:number)
  {

    if(i>3)
      return 'blue'
    return 'white'
  }
}
