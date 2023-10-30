import { Routes } from '@angular/router';

import { UsuarioComponent } from './usuario.component';
import { UsuarioListaComponent } from './sections/lista/lista.component';
import { UsuarioNovoComponent } from './sections/novo/novo.component';

export const usuarioRoutes: Routes = [
    {
        path: '',
        component: UsuarioComponent,
        children: [
            {
                path: 'lista',
                component: UsuarioListaComponent
            },
            {
                path: 'novo',
                component: UsuarioNovoComponent
            }
        ]
    },
];
