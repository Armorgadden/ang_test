import { Injectable, ErrorHandler } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ErrorMessages } from './constants/ErrorMessages';
import { NotificationService } from './services/notification.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(public notificationService: NotificationService) {}

  handleError(error) {
/*    let w = (<any>window);
    if(error.status === 0) {
      this.notificationService.error(ErrorMessages['errors.unavailable']);
    } else if(error.status && error.status !== 0) {
      try {
        let bodyJson = typeof error._body === 'object' ? error._body : JSON.parse(error._body);
        if(error.status === 401 || error.status === 403) {
          if(bodyJson.apiErrorCode === 'NOT_LOGGED_IN') {
            w.Events.publish('onLogout', {
              doNotShowLogin: error.doNotShowLogin
            });
          } else if(bodyJson.apiErrorCode === 'USAGE_LIMIT_EXCEEDED') {
            w.Events.publish('openContactSupportPopup'); //TODO show sales popup for demographics usage error
          } else {
            this.notificationService.error(ErrorMessages['errors.unauthorized']);
          }
        } else {
          let errorMessage = bodyJson ? ErrorMessages[bodyJson.apiErrorCode || bodyJson.message] || bodyJson.message : ErrorMessages['errors.default'];
          this.notificationService.error(errorMessage || ErrorMessages['errors.default']);
        }
      } catch(e) {
        this.notificationService.error(ErrorMessages['errors.default']);
      }
    }*/
    console.log(error);
  }
}
