import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-navigation-link',
	templateUrl: './navigation-link.component.html',
	styleUrls: ['./navigation-link.component.scss'],
})
export class NavigationLinkComponent {
	@Input() routerLink!: string;
	@Input() label!: string;
}
