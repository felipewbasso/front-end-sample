import { ComponentRef, Directive, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewContainerRef } from "@angular/core";
import { MatProgressBar } from "@angular/material/progress-bar";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { BehaviorSubject, Subject, skip, takeUntil } from "rxjs";
import { NgLoadingService } from "./ng-loading.service";
import { ThemePalette } from "@angular/material/core";

export type NgLoadingConfig = {

    type?: 'bar' | 'spinner';
    size?: number;

};

@Directive({
    selector: '[ngLoading]',
    standalone: true
})
export class NgLoadingDirective implements OnInit, OnDestroy {

    @Input('ngLoading') public name: string;

    @Input('ngLoadingConfig') public ngLoadingConfig: NgLoadingConfig;

    @Input('ngLoadingColor') public color: ThemePalette = 'primary';

    private _show$ = new BehaviorSubject<boolean>(false);

    private overlayContainer: HTMLDivElement;
    private overlayInner: HTMLDivElement;

    private _type: NgLoadingConfig['type'] = 'bar';
    private _size: NgLoadingConfig['size'] = undefined;

    private _unsubscribeAll = new Subject<void>();

    constructor(
        private _viewContainerRef: ViewContainerRef,
        private _elementRef: ElementRef<HTMLElement>,
        private _renderer2: Renderer2,
        private _loadingService: NgLoadingService
    ) { }

    private setVisible(): void {

        this.overlayContainer.classList.remove('w-0');
        this.overlayContainer.classList.remove('h-0');

        this.overlayContainer.classList.add('w-full');
        this.overlayContainer.classList.add('h-full');

        this.overlayContainer.classList.add('z-99');


        setTimeout(() => {
            this.overlayInner.classList.remove('opacity-0');
            this.overlayInner.classList.add('opacity-50');

            this.overlayInner.focus();
        }, 100);
    }

    private setInvisible(): void {

        this.overlayInner.classList.remove('opacity-50');
        this.overlayInner.classList.add('opacity-0');

        setTimeout(() => {

            this.overlayContainer.classList.remove('w-full');
            this.overlayContainer.classList.remove('h-full');

            this.overlayContainer.classList.add('w-0');
            this.overlayContainer.classList.add('h-0');

            this.overlayContainer.classList.remove('z-99');
        }, 300);

    }

    ngOnInit(): void {

        console.log('[loading_init]');
        console.log('[loading_name]:', this.name);

        this._setupLoading();

        this._loadingService.startedLoading$
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(loadingName => {

                if (loadingName == this.name)
                    this._show$.next(true);
            });

        this._loadingService.stopedLoading$
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(loadingName => {

                if (loadingName == this.name)
                    this._show$.next(false);
            });

        this._show$
            .pipe(
                skip(1),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(show => {

                if (show) {
                    this.setVisible();
                } else {
                    this.setInvisible();
                }
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    private _setupLoading(): void {

        if (this.ngLoadingConfig) {

            this._type = this.ngLoadingConfig.type;
            this._size = this.ngLoadingConfig.size;
        }

        this._renderer2.setStyle(this._elementRef.nativeElement, 'position', 'relative');

        this.overlayContainer = this._createOverlay(this.color);

        if (this._type == 'spinner') {
            this.addSpinnerToOverlay();
        } else {
            this.addLoadingBarToOverlay();
        }

        this._elementRef.nativeElement.insertAdjacentElement('beforeend', this.overlayContainer);
        // this._renderer2.setStyle(this.overlayInner, 'visibility', 'visible');
    }

    private addSpinnerToOverlay(): void {

        const spinner = this._createProgressSpinner(this._size, this.color);

        const spinnerEl = spinner.instance._elementRef.nativeElement

        spinnerEl.classList
            .add(...[
                'transition',
                'ease-in-out',
                'absolute'
            ]);

        this.overlayContainer.appendChild(spinnerEl);
    }

    private addLoadingBarToOverlay(): void {

        const progressBar = this._createProgressBar(this.color);

        const progressBarEl = progressBar.instance._elementRef.nativeElement;

        progressBarEl.classList
            .add(...[
                'transition',
                'ease-in-out',
                'absolute',
                'top-0'
            ]);

        this.overlayContainer.appendChild(progressBarEl);
    }

    private _isValidColor(color: ThemePalette): boolean {

        return (color == 'accent' || color == 'primary' || color == 'warn');
    }

    private _createOverlay(color: ThemePalette): HTMLDivElement {

        if (!this._isValidColor(color))
            throw new Error(`Loading should have a valid "color"!`);

        const overlayContainer = <HTMLDivElement>this._renderer2.createElement('div');

        const overlay = <HTMLDivElement>this._renderer2.createElement('div');

        overlayContainer.classList
            .add(...[
                'absolute',
                'inset-0',
                'w-0',
                'h-0',
                'flex',
                'items-center',
                'justify-center',
                'overflow-hidden'
                // 'w-full',
                // 'h-full',
                // 'z-99'
            ]);

        overlay.classList
            .add(...[
                'transition-opacity',
                'ease-in',
                'duration-300',
                'absolute',
                'flex',
                'w-full',
                'h-full',
                `bg-${color.toString()}-300`,
                'opacity-0'
            ]);

        this.overlayInner = overlay;

        overlayContainer.appendChild(overlay);

        return overlayContainer;
    }

    private _createProgressSpinner(size: number, color: ThemePalette): ComponentRef<MatProgressSpinner> {

        if (size === null || size === undefined || isNaN(size))
            throw new Error(`Loading of type "spinner" should have a valid "size"!`);

        if (!this._isValidColor(color))
            throw new Error(`Loading should have a valid "color"!`);

        const spinner = this._viewContainerRef.createComponent(MatProgressSpinner);
        spinner.instance.mode = 'indeterminate';
        spinner.instance.diameter = size;
        spinner.instance.color = color;

        return spinner;
    }

    private _createProgressBar(color: ThemePalette): ComponentRef<MatProgressBar> {

        if (!this._isValidColor(color))
            throw new Error(`Loading should have a valid "color"!`);

        const progressBar = this._viewContainerRef.createComponent(MatProgressBar);
        progressBar.instance.mode = 'indeterminate';
        progressBar.instance.color = color;

        return progressBar;
    }
}
