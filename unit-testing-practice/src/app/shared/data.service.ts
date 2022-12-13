import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}
  getData() {
    const promise = new Promise((reject, resolve) => {
      setTimeout(() => {
        resolve('Data');
      }, 1500);
    });
    return promise;
  }
}
