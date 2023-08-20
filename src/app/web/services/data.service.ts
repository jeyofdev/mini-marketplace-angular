import { Injectable } from '@angular/core';
import { INavLink } from '../../shared/interfaces/link.interface';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	getNavigationLinks(): INavLink[] {
		return [
			{
				label: 'Home',
				routerLink: '/home',
			},
			{
				label: 'Women',
				routerLink: '/women',
			},
			{
				label: 'Men',
				routerLink: '/men',
			},
			{
				label: 'Children',
				routerLink: '/children',
			},
		];
	}
}
