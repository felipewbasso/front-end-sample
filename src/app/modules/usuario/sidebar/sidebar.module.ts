import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";

import { SharedModule } from "app/shared/shared.module";
import { MaterialModule } from "app/shared/modules/material.module";

import { UsuarioSidebarComponent } from "./sidebar.component";

@NgModule({
    imports: [
        SharedModule,
        MaterialModule,
        RouterModule,
    ],
    declarations: [
        UsuarioSidebarComponent
    ],
    exports: [
        UsuarioSidebarComponent
    ]
})
export class HomeSidebarModule { }
