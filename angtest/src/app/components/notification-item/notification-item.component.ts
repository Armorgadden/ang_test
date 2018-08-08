import { Component, OnInit, OnDestroy, ViewEncapsulation, trigger, state, style, transition, animate } from '@angular/core'
import { Notification } from '../../interfaces/notification'
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-item',
  templateUrl: 'notification-item.component.html',
  styleUrls: ['notification-item.component.less'],
  encapsulation: ViewEncapsulation.None,
  inputs: [
      'item',
      'timeOut',
      'position',
      'clickToClose',
      'pauseOnHover',
      'theClass',
      'animate'
  ],
  animations: [
      trigger('enterLeave', [

          // Enter from right
          state('fromRight', style({opacity: 1, transform: 'translateX(0)'})),
          transition('* => fromRight', [
              style({opacity: 0, transform: 'translateX(5%)'}),
              animate('400ms ease-in-out')
          ]),
          state('fromRightOut', style({opacity: 0, transform: 'translateX(-5%)'})),
          transition('fromRight => fromRightOut', [
              style({opacity: 1, transform: 'translateX(0)'}),
              animate('300ms ease-in-out')
          ]),

          // Enter from left
          state('fromLeft', style({opacity: 1, transform: 'translateX(0)'})),
          transition('* => fromLeft', [
              style({opacity: 0, transform: 'translateX(-5%)'}),
              animate('400ms ease-in-out')
          ]),
          state('fromLeftOut', style({opacity: 0, transform: 'translateX(5%)'})),
          transition('fromLeft => fromLeftOut', [
              style({opacity: 1, transform: 'translateX(0)'}),
              animate('300ms ease-in-out')
          ]),

          // Rotate
          state('scale', style({opacity: 1, transform: 'scale(1)'})),
          transition('* => scale', [
              style({opacity: 0, transform: 'scale(0)'}),
              animate('400ms ease-in-out')
          ]),
          state('scaleOut', style({opacity: 0, transform: 'scale(0)'})),
          transition('scale => scaleOut', [
              style({opacity: 1, transform: 'scale(1)'}),
              animate('400ms ease-in-out')
          ]),

          // Scale
          state('rotate', style({opacity: 1, transform: 'rotate(0deg)'})),
          transition('* => rotate', [
              style({opacity: 0, transform: 'rotate(5deg)'}),
              animate('400ms ease-in-out')
          ]),
          state('rotateOut', style({opacity: 0, transform: 'rotate(-5deg)'})),
          transition('rotate => rotateOut', [
              style({opacity: 1, transform: 'rotate(0deg)'}),
              animate('400ms ease-in-out')
          ])
      ])
    ],
})
export class NotificationItemComponent implements OnInit, OnDestroy {

  constructor(private notificationService: NotificationService) {}

  // Inputs
  public item: Notification;
  public theClass: string;
  public animate: string;

  public overrides: any;

  // Locals
  private stopTime: boolean = false;
  private timer: any;
  private steps: number;
  private speed: number;
  private count: number = 0;
  private start: any;
  private diff: any;

  private timeOut: number;
  private position: number;
  private clickToClose: boolean;
  private pauseOnHover: boolean;

  ngOnInit(): void {
      if (this.animate) this.item['state'] = this.animate;
      if (this.item.override) this.attachOverrides();
      if (this.timeOut !== 0) this.startTimeOut();
  }

  startTimeOut(): void {
      this.steps = this.timeOut / 10;
      this.speed = this.timeOut / this.steps;
      this.start = new Date().getTime();
      this.timer = setTimeout(this.instance, this.speed);
  }

  onEnter(): void {
      if (this.pauseOnHover) this.stopTime = true
  }

  onLeave(): void {
      if (this.pauseOnHover) {
          this.stopTime = false;
          setTimeout(this.instance, (this.speed - this.diff));
      }
  }

  setPosition(): number {
      return this.position !== 0 ? this.position * 90 : 0;
  }

  removeOnClick(): void {
      if (this.clickToClose) this._remove()
  }

  // Attach all the overrides
  attachOverrides(): void {
      Object.keys(this.item.override).forEach(a => this[a] = this.item.override[a])
  }

  ngOnDestroy(): void { clearTimeout(this.timer) }

  private instance = () => {
      this.diff = (new Date().getTime() - this.start) - (this.count * this.speed);
      if (this.count++ === this.steps) this._remove();
      else if (!this.stopTime) {
          this.timer = setTimeout(this.instance, (this.speed - this.diff));
      }
  };

  private _remove() {
      if (this.animate) {
          this.item['state'] = this.animate + 'Out';
          setTimeout(() => this.notificationService.set(this.item, false), 310)
      }

      else this.notificationService.set(this.item, false)
  }

}