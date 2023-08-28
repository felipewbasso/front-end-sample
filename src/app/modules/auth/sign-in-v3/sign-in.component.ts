import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { fuseAnimations } from '@fuse/animations';
import { FuseCardModule } from '@fuse/components/card';
import { FuseAlertModule, FuseAlertType } from '@fuse/components/alert';

import { AuthService } from 'app/core/auth/auth.service';
import { MaterialModule } from 'app/shared/modules/material.module';
import { SharedModule } from 'app/shared/shared.module';

import { AuthSignInFormService } from './services/sign-in-form.service';

@Component({
    selector     : 'auth-sign-in',
    templateUrl  : './sign-in.component.html',
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations,
    standalone: true,
    imports: [
        SharedModule,
        MaterialModule,
        FuseCardModule,
        FuseAlertModule,
        RouterModule
    ],
    providers: [
        AuthSignInFormService
    ]
})
export default class AuthSignInComponent implements OnInit
{
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: UntypedFormGroup;
    showAlert: boolean = false;

    public readonly form = this._formService.form;

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _authService: AuthService,
        private _formBuilder: UntypedFormBuilder,
        private _formService: AuthSignInFormService,
        private _router: Router,
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Create the form
        // this.signInForm = this._formBuilder.group({
        //     email     : ['hughes.brian@company.com', [Validators.required, Validators.email]],
        //     password  : ['admin', Validators.required],
        //     rememberMe: ['']
        // });

        this._formService.patchValue({
            email: 'hughes.brian@company.com',
            password: 'admin',
            rememberMe: false
        });
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Sign in
     */
    signIn(): void
    {

        const value = this._formService.getValue();

        console.log('[FORM_VALUE]:', value);

        return;
        // Return if the form is invalid
        if ( this.signInForm.invalid )
        {
            return;
        }

        // Disable the form
        this.signInForm.disable();

        // Hide the alert
        this.showAlert = false;

        // Sign in
        this._authService.signIn(this.signInForm.value)
            .subscribe(
                () => {

                    // Set the redirect url.
                    // The '/signed-in-redirect' is a dummy url to catch the request and redirect the user
                    // to the correct page after a successful sign in. This way, that url can be set via
                    // routing file and we don't have to touch here.
                    const redirectURL = this._activatedRoute.snapshot.queryParamMap.get('redirectURL') || '/signed-in-redirect';

                    // Navigate to the redirect url
                    this._router.navigateByUrl(redirectURL);

                },
                (response) => {

                    // Re-enable the form
                    this.signInForm.enable();

                    // Reset the form
                    this.signInNgForm.resetForm();

                    // Set the alert
                    this.alert = {
                        type   : 'error',
                        message: 'Wrong email or password'
                    };

                    // Show the alert
                    this.showAlert = true;
                }
            );
    }
}
