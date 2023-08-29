import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';

import { homeRoutes } from './home.routing';

import { HomeComponent } from './home.component';
import { MaterialModule } from 'app/shared/modules/material.module';

@NgModule({
    imports: [
        SharedModule,
        MaterialModule,
        RouterModule.forChild(homeRoutes)
    ],
    declarations: [
        HomeComponent
    ],
    exports: [],
})
export class HomeModule {}
