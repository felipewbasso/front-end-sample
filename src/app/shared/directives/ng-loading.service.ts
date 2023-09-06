import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class NgLoadingService {

    private _startedLoading = new Subject<string>();
    private _stopedLoading = new Subject<string>();

    public readonly startedLoading$ = this._startedLoading.asObservable();
    public readonly stopedLoading$ = this._stopedLoading.asObservable();

    /**
     * Constructor
     */
    constructor() { }

    public start(name: string): void {

        this._startedLoading.next(name);

        const interval = 3000;

        setTimeout(() => {

            this.stop(name);

            setTimeout(() => {

                this.start(name);

            }, interval);

        }, interval);
    }

    public stop(name: string): void {

        this._stopedLoading.next(name);
    }
}
