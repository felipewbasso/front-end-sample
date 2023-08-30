import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

type FormValue = {
    email: string;
    password: string;
    rememberMe: boolean;
};

type FormType = {
    email: FormControl<FormValue['email']>;
    password: FormControl<FormValue['password']>;
    rememberMe: FormControl<FormValue['rememberMe']>;
};

@Injectable()
export class AuthSignInFormService {

    public readonly form = this._buildForm();

    constructor(
        private _fb: FormBuilder
    ) { }

    public getValue(): FormValue {

        const value: FormValue = {
            email: this.form.get('email').value,
            password: this.form.get('password').value,
            rememberMe: this.form.get('rememberMe').value
        };

        return value;
    }

    public patchValue(value: FormValue): void {

        if (!value)
            return;

        this.form.patchValue({
            email: value.email,
            password: value.password,
            rememberMe: value.rememberMe
        });
    }

    private _buildForm(): FormGroup<FormType> {

        const form: FormGroup<FormType> = this._fb.group({
            email: [null as string],
            password: [null as string],
            rememberMe: [false]
        });

        return form;
    }
}
