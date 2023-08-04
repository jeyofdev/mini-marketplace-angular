import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-brands-svg-icons';

@Component({
	selector: 'app-nav-link',
	templateUrl: './nav-link.component.html',
	styleUrls: ['./nav-link.component.scss'],
})
export class NavLinkComponent {
	@Input() routerLink!: string;
	@Input() label!: string;
	@Input() icon!: IconDefinition;
}
