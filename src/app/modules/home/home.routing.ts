import { Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export const homeRoutes: Routes = [
    {
        path: '',
        component: HomeComponent,
        children: [
            {
                path: 'x',
                loadComponent: () =>
                    import('./test1/test1.component').then(
                        (c) => c.HomeTest1Component
                    ),
            },
        ],
    },
];
