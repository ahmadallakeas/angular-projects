import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  id: number;
  private sub: Subscription;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  onActivate() {
    this.userService.activatedEmitter.next(true);
  }
}
