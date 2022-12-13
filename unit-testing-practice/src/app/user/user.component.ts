import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user: { name: string };
  isLoggedIn = false;
  data: string;
  constructor(
    private userService: UserService,
    private dataService: DataService
  ) {}
  ngOnInit() {
    this.user = this.userService.user;
    this.dataService.getData().then((data: string) => (this.data = data));
  }
}
