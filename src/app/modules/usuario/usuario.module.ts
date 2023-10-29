import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { MaterialModule } from 'app/shared/modules/material.module';

import { usuarioRoutes } from './usuario.routing';

import { UsuarioComponent } from './usuario.component';
import { HomeSidebarModule } from './sidebar/sidebar.module';
import { UsuarioListaComponent } from './sections/lista/lista.component';

@NgModule({
    imports: [
        SharedModule,
        MaterialModule,
        RouterModule.forChild(usuarioRoutes),

        HomeSidebarModule
    ],
    declarations: [
        UsuarioComponent,
        UsuarioListaComponent
    ],
    exports: [],
})
export class UsuarioModule {}
