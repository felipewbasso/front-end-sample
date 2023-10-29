import { Routes } from '@angular/router';

import { UsuarioComponent } from './usuario.component';

export const usuarioRoutes: Routes = [
    {
        path: '',
        component: UsuarioComponent,
        children: [

        ]
    },
];
