import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

import { FuseMediaWatcherService } from '@fuse/services/media-watcher';

import { Subject, takeUntil } from 'rxjs';

import { UsuarioService } from './services/usuario.service';

@Component({
    selector: 'app-usuario',
    templateUrl: './usuario.component.html',
    styleUrls: [],
    providers: [
        UsuarioService
    ]
})
export class UsuarioComponent implements OnInit, OnDestroy {

    public drawerMode: MatDrawerMode = 'side';
    public drawerOpened: boolean = true;

    private _unsubscribeAll = new Subject<void>();

    constructor(
        private _mediaWatcherService: FuseMediaWatcherService
    ) {}

    ngOnInit(): void {

        this._mediaWatcherService.onMediaChange$
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(({ matchingAliases }) => {

                if (matchingAliases.includes('lg')) {
                    this.drawerMode = 'side';
                    setTimeout(() => (this.drawerOpened = true));
                } else {
                    this.drawerMode = 'over';
                    setTimeout(() => (this.drawerOpened = false));
                }
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
