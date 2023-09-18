import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { ThemePalette } from "@angular/material/core";

import { Subject, fromEvent, takeUntil } from "rxjs";

import { SharedModule } from "app/shared/shared.module";
import { MaterialModule } from "app/shared/modules/material.module";
import { SanitizerUrlPipe } from "app/shared/pipes/sanitizer-url/sanitizer-url.pipe";

export type AudioPlayerComponentTheme = ThemePalette | 'basic';

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

    @Input('color') public set setColor(color: AudioPlayerComponentTheme) {
        this.color = color;
    }

    @Input('url') public url: string;

    /**
     * Audio title
     */
    @Input('title') public title: string;

    public color: AudioPlayerComponentTheme = 'primary';

    public loading: boolean = true;

    public player: HTMLAudioElement;

    @ViewChild('audioPlayer', { static: true }) public set setAudioPlayerRef(ref: ElementRef<HTMLAudioElement>) {
        this.player = ref.nativeElement;
    };

    private readonly _unsubscribeAll = new Subject<void>();

    /**
     * Constructor
     */
    constructor() { }

    ngOnInit(): void {

        setTimeout(() => (this.loading = false), 15000);

        fromEvent(this.player, 'playing')
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                // this.isPlaying = true;
                // this.duration = Math.floor(this.player.duration);
            });

        fromEvent(this.player, 'pause')
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                // this.isPlaying = false;
            });

        fromEvent(this.player, 'timeupdate')
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                // this.progress = Math.round(this.player.currentTime * 20) / 20;
                // this.currentTime = Math.floor(this.player.currentTime);
            });

        fromEvent(this.player, 'volume')
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                // this.volume = Math.floor(this.player.volume);
            });

        fromEvent(this.player, 'loadstart')
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                // this.loading = true;
            });

        fromEvent(this.player, 'loadeddata')
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(() => {
                // this.loading = false;
                // this.duration = Math.floor(this.player.duration);
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    /**
     * Toggle volume action
     */
    public toggleVolume(): void {

    }
}
