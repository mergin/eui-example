import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule } from '@ngx-translate/core';

import './operators';

import { CoreModule as UxCoreModule, translateConfig } from '@eui/ux-core';

import { appConfig } from '../../config/index';
import { environment } from '../../environments/environment';

import { REDUCER_TOKEN, getReducers, metaReducers } from './reducers/index';

import { SearchInputComponent } from './components/shell/search-input/search-input.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
        UxCoreModule.forRoot({ appConfig: appConfig, environment: environment }),
        StoreModule.forRoot(REDUCER_TOKEN, { metaReducers }),
        !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],
        TranslateModule.forRoot(translateConfig),
    ],
    declarations: [
        SearchInputComponent
    ],
    exports: [
        SharedModule,
        SearchInputComponent
    ],
    providers: [
        {
            provide: REDUCER_TOKEN,
            deps: [],
            useFactory: getReducers
        }
    ]
})
export class CoreModule {

}
