import { Component } from '@angular/core';
import { AudioPlayerComponent } from 'app/shared/components/audio-player/audio-player.component';

import { SharedModule } from 'app/shared/shared.module';

@Component({
    selector: 'app-home-test1',
    templateUrl: './test1.component.html',
    styleUrls: [],
    standalone: true,
    imports: [SharedModule, AudioPlayerComponent],
})
export class HomeTest1Component {

    constructor() {}
}
