import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CounterService {
  activeToInactiveCounter = 0;
  inactiveToActiveCounter = 0;

  incActiveToInactiveCounter() {
    this.activeToInactiveCounter++;
    console.log('ActiveToIncactiveCounter: ' + this.activeToInactiveCounter);
  }
  incInactiveToActiveCounter() {
    this.inactiveToActiveCounter++;
    console.log('InactiveToActiveCounter: ' + this.inactiveToActiveCounter);
  }
  constructor() {}
}
