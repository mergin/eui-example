import { Component, Inject, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { UxLink, UxLanguage } from '@eui/ux-commons';
import {
    CONFIG_TOKEN,
    AppState,
    UserState,
    RouteUpdateAction,
    getAppState,
    getUserState,
    StoreService,
    UxService,
} from '@eui/ux-core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    appState: Observable<AppState>;
    userState: Observable<UserState>;

    menuLinks: UxLink[] = [];
    notificationLinks: UxLink[] = [];
    userInfos: string = 'NAME Firstname';

    constructor(
        @Inject(CONFIG_TOKEN) private config: any,
        private translateService: TranslateService,
        private uxService: UxService,
        private store: Store<any>,
    ) {
        translateService.setDefaultLang('en');
        translateService.use('en');
    }

    ngOnInit() {
        this.appState = this.store.select(getAppState);
        this.userState = this.store.select(getUserState);

        this._createMenuLinks();
        this._createNotifications();
    }

    onLanguageChanged(language: UxLanguage) {
        console.log(language);
        this.translateService.use(language.code);
    }

    private _createMenuLinks() {
        this.menuLinks = [
            new UxLink(
                {
                    label: 'HOME', url: '/screen/home', isHome: true
                }
            ),
            new UxLink(
                {
                    label: 'Module1', url: '/screen/module1', children: [
                        new UxLink({ label: 'disabled item', disabled: true }),
                        new UxLink({ label: 'Page 1', url: '/screen/module1/page1' }),
                        new UxLink({ label: 'Page 2', url: '/screen/module1/page2' })
                    ]
                }
            ),
            new UxLink(
                {
                    label: 'Module2', url: '/screen/module2'
                }
            )
        ];
    }

    private _createNotifications() {
        this.notificationLinks = [
            new UxLink(
                { label: 'Notification title', subLabel: 'This is the description of the noficiation' }
            ),
            new UxLink(
                { label: 'Notification title', subLabel: 'This is the description of the noficiation' }
            ),
            new UxLink(
                 { label: 'Notification title', subLabel: 'This is the description of the noficiation' }
            ),
        ];
    }
}
