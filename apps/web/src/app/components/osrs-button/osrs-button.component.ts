import { Component, Input } from '@angular/core';

@Component({
    selector: 'varrock-stray-dog-osrs-button',
    templateUrl: './osrs-button.component.html',
    styleUrls: ['./osrs-button.component.scss'],
})
export class OsrsButtonComponent {
    @Input() href: string | null = null;
    @Input() target?: string;
}
