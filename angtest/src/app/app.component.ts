import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  notificationOptions = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxStack: 7,
    preventDuplicates: false,
    preventLastDuplicates: 'visible',
    animate: 'fromLeft',
    position: ['left', 'bottom']
  }
}
