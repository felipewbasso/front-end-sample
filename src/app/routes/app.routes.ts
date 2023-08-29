import { Routes } from "@angular/router";
import { LayoutComponent } from "app/layout/layout.component";

export const appRoutes: Routes = [

    {
        path: '',
        // canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module')
                    .then(m => m.AuthConfirmationRequiredModule)
            },
            {
                path: 'forgot-password',
                loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module')
                    .then(m => m.AuthForgotPasswordModule)
            },
            {
                path: 'reset-password',
                loadChildren: () => import('app/modules/auth/reset-password/reset-password.module')
                    .then(m => m.AuthResetPasswordModule)
            },
            {
                path: 'sign-in',
                loadChildren: () => import('app/modules/auth/sign-in/sign-in.module')
                    .then(m => m.AuthSignInModule)
            },
            {
                path: 'sign-in-v2',
                loadComponent: () => import('app/modules/auth/sign-in-v2/sign-in.component')
            },
            {
                path: 'sign-in-v3',
                loadComponent: () => import('app/modules/auth/sign-in-v3/sign-in.component')
            },
        ]
    },
    {
        path: '',
        // canMatch: [NoAuthGuard],
        component: LayoutComponent,
        children: [
            {
                path: 'home',
                loadChildren: () =>
                    import('app/modules/home/home.module').then(
                        (m) => m.HomeModule
                    ),
            },
        ],
    },

];
