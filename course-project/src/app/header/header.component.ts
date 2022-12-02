import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  @Output() selectFeature = new EventEmitter<string>();
  onSelect(selected: string) {
    this.selectFeature.emit(selected)
  }
}
