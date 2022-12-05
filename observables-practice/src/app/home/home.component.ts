import { Component, OnDestroy, OnInit } from '@angular/core';
import { count, interval, Observable, Observer, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor() {}
  obs: Subscription;
  ngOnInit() {
    // this.obs= interval(1000).subscribe((period) => {
    //  console.log(period);
    // });
    const customeObservable = new Observable((observer) => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count === 4) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('Count greater than 3!!!'));
        }
        count++;
      }, 1000);
    });
    this.obs = customeObservable
      .pipe(
        filter((data) => {
          return data > 1;
        }),
        map((data: number) => {
          return 'Round ' + (data + 1);
        })
      )
      .subscribe({
        next: (count) => {
          console.log(count);
        },
        error: (error) => {
          console.log(error);
          alert(error.message);
        },
        complete: () => {
          console.log('Completed');
        },
      });
  }
  ngOnDestroy() {
    this.obs.unsubscribe();
  }
}
