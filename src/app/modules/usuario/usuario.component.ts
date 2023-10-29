import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: [],
})
export class UsuarioComponent {

    public drawerMode: MatDrawerMode = 'side';
    public drawerOpened: boolean = true;

    constructor() {}
}
