import { Component, EventEmitter, OnInit, OnDestroy, ViewEncapsulation, Input, Output, ChangeDetectorRef } from '@angular/core';

import { Notification } from '../../interfaces/notification';
import { NotificationService } from '../../services/notification.service';
import { NotificationItemComponent } from '../../components/notification-item/notification-item.component';
import { NotificationOptions } from '../../interfaces/notification-options';

@Component({
  selector: 'app-notification',
  templateUrl: 'notification.component.html',
  styleUrls: ['notification.component.less'], 
  encapsulation: ViewEncapsulation.None
})
export class NotificationComponent implements OnInit, OnDestroy {

    constructor(private notificationService: NotificationService, private ref: ChangeDetectorRef) {}

    @Input() set options(opt: NotificationOptions) {
        this.attachChanges(opt)
    }

    @Output() onCreate = new EventEmitter();
    @Output() onDestroy = new EventEmitter();

    public notifications: Notification[] = [];
    public position: ['top' | 'bottom', 'right' | 'left'] = ['bottom', 'left'];

    private listener: any;

    // Received values
    private lastOnBottom: boolean = true;
    private maxStack: number = 8;
    private preventLastDuplicates: any = false;
    private preventDuplicates: boolean = false;

    // Sent values
    private timeOut: number = 0;
    private clickToClose: boolean = true;
    private pauseOnHover: boolean = true;
    private theClass: string;
    private animate: 'fromRight' | 'fromLeft' | 'rotate' | 'scale' = 'fromLeft';
    private expand: string;

    private lastNotificationCreated: Notification;


    ngOnInit(): void {
        // Listen for changes in the service
        this.listener = this.notificationService.getChangeEmitter()
            .subscribe(item => {
                switch (item.command) {
                    case 'cleanAll':
                        this.notifications = [];
                        break;

                    case 'clean':
                        this.cleanSingle(item.id);
                        break;

                    case 'set':
                        if (item.add) this.add(item.notification);
                        else this.defaultBehavior(item);
                        break;

                    default:
                        this.defaultBehavior(item);
                        break;
                }
            });
    }

    // Default behavior on event
    defaultBehavior(value): void {
        this.notifications.splice(this.notifications.indexOf(value.notification), 1);
        this.onDestroy.emit(this.buildEmit(value.notification, false));
    }


    // Add the new notification to the notification array
    add(item): void {
        item.createdOn = new Date();

        let toBlock = this.preventLastDuplicates || this.preventDuplicates ? this.block(item) : false;

        // Save this as the last created notification
        this.lastNotificationCreated = item;

        if (!toBlock) {
            // Check if the notification should be added at the start or the end of the array
            if (this.lastOnBottom) {
                if (this.notifications.length >= this.maxStack) this.notifications.splice(0, 1);
                this.notifications.push(item);
            } else {
                if (this.notifications.length >= this.maxStack) this.notifications.splice(this.notifications.length - 1, 1);
                this.notifications.splice(0, 0, item);
            }

            this.onCreate.emit(this.buildEmit(item, true));
        }
        // Push for manual change detection as a safe bet so that notifications get added 
        this.ref.detectChanges();
    }

    // Check if notifications should be prevented
    block(item): boolean {

        let checkStandard = (checker) => checker.type === item.type && checker.content === item.content,
            toCheck = checkStandard;

        if (this.preventDuplicates && this.notifications.length > 0)
            for (let i = 0; i < this.notifications.length; i++)
                if (toCheck(this.notifications[i])) return true;



        if (this.preventLastDuplicates) {

            let comp: any;

            if (this.preventLastDuplicates === 'visible' && this.notifications.length > 0) {
                if (this.lastOnBottom) comp = this.notifications[this.notifications.length - 1];
                else comp = this.notifications[0];
            }

            else if (this.preventLastDuplicates === 'all' && this.lastNotificationCreated) comp = this.lastNotificationCreated;
            else return false;
            return toCheck(comp);

        }

        return false;
    }

    // Attach all the changes received in the options object
    attachChanges(options): void {
        Object.keys(options).forEach(a => {
            if (this.hasOwnProperty(a)) this[a] = options[a]
        })
    }

    buildEmit(notification: Notification, to: boolean) {
        let toEmit = {
            createdOn: notification.createdOn,
            type: notification.type,
            id: notification.id
        };

        toEmit['content'] = notification.content;

        if (!to) toEmit['destroyedOn'] = new Date();

        return toEmit;
    }

    cleanSingle(id: string): void {
        let indexOfDelete: number,
            doDelete: boolean = false;

        this.notifications.forEach((a, idx) => {
            if (a.id === id) {
                indexOfDelete = idx;
                doDelete = true;
            }
        });

        if (doDelete) this.notifications.splice(indexOfDelete, 1);
    }

    ngOnDestroy(): void {
        if (this.listener) this.listener.unsubscribe()
    }
}