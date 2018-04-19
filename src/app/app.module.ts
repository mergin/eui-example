import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {
    CachePreventionInterceptor,
    CorsSecurityInterceptor,
    CsrfPreventionInterceptor,
    EuLoginSessionTimeoutHandlingInterceptor,
} from '@eui/ux-core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CoreModule,
        AppRoutingModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CorsSecurityInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: EuLoginSessionTimeoutHandlingInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CsrfPreventionInterceptor,
            multi: true,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CachePreventionInterceptor,
            multi: true,
        },
    ],
    exports: [
    ],
    bootstrap: [
        AppComponent
    ],
})
export class AppModule { }
