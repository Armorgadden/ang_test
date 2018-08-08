import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Rx';
import { Notification } from '../interfaces/notification';
import { NotificationEvent } from '../interfaces/notification-event';

@Injectable()
export class NotificationService {

    private _emitter: Subject<NotificationEvent> = new Subject<NotificationEvent>();

    set(notification: Notification, to: boolean) {
        notification.id = notification.override && notification.override.id ? notification.override.id : Math.random().toString(36).substring(3);
        this._emitter.next({command: 'set', notification: notification, add: to});
        return notification;

    };
    getChangeEmitter() { 
        return this._emitter 
    }

    //// Access methods
    success(content: string, override?: any) { 
        return this.set({content: content, type: 'success', override: override}, true) 
    }
    error(content: string, override?: any) { 
        return this.set({content: content, type: 'error', override: override}, true) 
    }
    info(content: string, override?: any) { 
        return this.set({content: content, type: 'info', override: override}, true) 
    }
    
    // With type method
    create(content: string, type: string, override?: any) { 
        return this.set({content: content, type: type, override: override}, true) 
    }

    // Remove all notifications method
    remove(id?: string) {
        if (id) this._emitter.next({command: 'clean', id: id});
        else this._emitter.next({command: 'cleanAll'});
    }

}