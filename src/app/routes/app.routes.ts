import { Routes } from "@angular/router";

import { AuthGuard } from "app/core/auth/guards/auth.guard";
import { NoAuthGuard } from "app/core/auth/guards/noAuth.guard";
import { LayoutComponent } from "app/layout/layout.component";

export const appRoutes: Routes = [

    /**
     * Redirects
     */
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    // Redirect signed-in user to the '/dashboards/project'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {
        path: 'signed-in-redirect',
        pathMatch : 'full',
        redirectTo: 'home'
    },

    /**
     * Auth routes
     */
    {
        path: '',
        // canMatch: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-in',
                loadChildren: () => import('app/modules/auth/sign-in/sign-in.module')
                    .then(m => m.AuthSignInModule)
            },
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
        ]
    },

    /**
     * Auth routes for authenticated users
     */
    {
        path: '',
        canMatch: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)
            },
        ]
    },

    /**
     * Modules
     */
    {
        path: '',
        canMatch: [AuthGuard],
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
