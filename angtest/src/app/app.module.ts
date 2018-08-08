import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Components
import { AppComponent } from './app.component';
import { FormComponent, ResultComponent, NotificationComponent, NotificationItemComponent } from './components/index';

//Override Modules
import { CustomRouter } from './app.routes';
import { CustomErrorHandler } from './app.error.handler';
import { CustomHttpInterceptor } from './app.interceptor';

//External Modules
import { DropdownModule } from 'ngx-dropdown';

//Services
import { DataService } from './services/data.service';
import { NotificationService } from './services/notification.service';


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    ResultComponent,
    NotificationComponent,
    NotificationItemComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    CustomRouter,
    DropdownModule,
  ],
  providers: [
    DataService,
    NotificationService,
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    { provide: ErrorHandler, useClass: CustomErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
