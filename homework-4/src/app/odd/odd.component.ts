import { Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css'],
})
export class OddComponent implements OnInit {
  @Input() number:number;
  constructor() {}
  ngOnInit() {}
}
