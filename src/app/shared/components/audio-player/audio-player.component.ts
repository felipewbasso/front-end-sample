import { Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";

import { Subject } from "rxjs";
import { SharedModule } from "app/shared/shared.module";
import { MaterialModule } from "app/shared/modules/material.module";
import { SanitizerUrlPipe } from "app/shared/pipes/sanitizer-url/sanitizer-url.pipe";

@Component({
    selector: 'app-audio-player',
    templateUrl: './audio-player.component.html',
    standalone: true,
    styleUrls: ['./audio-player.component.scss'],
    encapsulation: ViewEncapsulation.None,
    imports: [
        SharedModule,
        MaterialModule,
        SanitizerUrlPipe
    ]
})
export class AudioPlayerComponent implements OnInit, OnDestroy {

    url = 'assets/audio/believer-first-1-minute.mp3';

    private readonly _unsubscribeAll = new Subject<void>();

    /**
     * Constructor
     */
    constructor() { }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }
}
