import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { FuseModule } from '@fuse';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { FuseConfigModule } from '@fuse/services/config';

import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';

import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/routes/app.routes';
import { LayoutModule } from 'app/layout/layout.module';

import { mockApiServices } from 'app/mock-api';

import { materialModulesProviders } from 'app/shared/modules/providers/material-modules.provider';

// platformBrowserDynamic()
//     .bootstrapModule(AppModule)
//     .catch(err => console.error(err));

bootstrapApplication(AppComponent, {
    providers: [

        /**
		 * Root navigation
		 */
        provideRouter(appRoutes,
            withPreloading(PreloadAllModules)
        ),

        /**
		 * Browser animation dependencies
		 */
        provideAnimations(),

        /**
		 * Root providers from modules
		 */
        importProvidersFrom([
            // Material
            ...materialModulesProviders,

            // Fuse, FuseConfig & FuseMockAPI
            FuseModule,
            FuseConfigModule.forRoot(appConfig),
            FuseMockApiModule.forRoot(mockApiServices),

            // Core module of your application
            CoreModule,

            // Layout module of your application
            LayoutModule
        ])
    ]
})
