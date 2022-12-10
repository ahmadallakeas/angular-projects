import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent {

  @Input() message:string
  @Output() closed= new EventEmitter<void>()
  onClose()
  {
    this.closed.emit()
  }
}
