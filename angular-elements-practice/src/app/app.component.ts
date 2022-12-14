import { Component, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertComponent } from './alert/alert.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  content = null;
  constructor(inject: Injector, domSanitizer: DomSanitizer) {
    const element = createCustomElement(AlertComponent, { injector: inject });
    customElements.define('my-alert', element);
    setTimeout(
      () =>
        (this.content = domSanitizer.bypassSecurityTrustHtml(
          "<my-alert message='Rendered Dynamically'></my-alert>"
        )),
      1000
    );
  }
}
