import { NgModule } from "@angular/core";

import { SharedModule } from "app/shared/shared.module";
import { MaterialModule } from "app/shared/modules/material.module";

import { HomeSidebarComponent } from "./sidebar.component";

@NgModule({
    imports: [
        SharedModule,
        MaterialModule,
    ],
    declarations: [
        HomeSidebarComponent
    ],
    exports: [
        HomeSidebarComponent
    ]
})
export class HomeSidebarModule { }
