import { Component } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

@Component({
    selector: 'app-home-test1',
    templateUrl: './test1.component.html',
    styleUrls: [],
    standalone: true,
    imports: [SharedModule],
})
export class HomeTest1Component {
    
    constructor() {}
}
