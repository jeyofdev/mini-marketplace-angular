import { Component, OnInit } from '@angular/core';
import {
	IconDefinition,
	faBarsStaggered,
	faPlus,
	faEllipsis,
	faChartSimple,
	faTags,
	faCartShopping,
} from '@fortawesome/free-solid-svg-icons';
import { INavLink } from 'src/app/shared/interfaces/link.interface';

@Component({
	selector: 'app-dashboard-layout',
	templateUrl: './dashboard-layout.component.html',
	styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
	logoIcon!: IconDefinition;
	addIcon!: IconDefinition;
	moreIcon!: IconDefinition;
	navLinks!: INavLink[];

	ngOnInit(): void {
		this.logoIcon = faBarsStaggered;
		this.addIcon = faPlus;
		this.moreIcon = faEllipsis;
		this.navLinks = [
			{
				label: 'Dashboard',
				routerLink: '/dashboard/home',
				icon: faChartSimple,
			},
			{
				label: 'Products',
				routerLink: '/dashboard/products',
				icon: faCartShopping,
			},
			{
				label: 'Categories',
				routerLink: '/dashboard/categories',
				icon: faTags,
			},
		];
	}
}
