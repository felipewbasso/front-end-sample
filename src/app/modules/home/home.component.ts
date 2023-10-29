import { Component } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: [],
})
export class HomeComponent {

    public drawerMode: MatDrawerMode = 'side';
    public drawerOpened: boolean = true;

    constructor() {}
}
