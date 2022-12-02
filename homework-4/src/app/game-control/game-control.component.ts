import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css'],
})
export class GameControlComponent implements OnInit {
  interval;
  @Output() startEvent = new EventEmitter<number>();

  constructor() {}
  ngOnInit() {}
  startNumber: number = 0;

  onStart() {
    this.interval = setInterval(() => {
      this.startEvent.emit(this.startNumber);
      this.startNumber++;
    }, 1000);
  }
  onStop()
  {
    clearInterval(this.interval)
  }
}
