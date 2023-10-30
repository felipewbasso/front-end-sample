import { Component, EventEmitter, OnInit, Output } from "@angular/core";


@Component({
    selector: 'app-usuario-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: []
})
export class UsuarioSidebarComponent implements OnInit {

    // -----------------------------------------------------------------------------------------------------
    // @ Event binding
    // -----------------------------------------------------------------------------------------------------

    /**
     * Close sidebar event
     */
    @Output('onCloseSidebar') public onCloseSidebar = new EventEmitter<void>();

    /**
     * Constructor
     */
    constructor() { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    ngOnInit(): void {

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    public closeSidebar(): void {
        this.onCloseSidebar.emit();
    }
}
