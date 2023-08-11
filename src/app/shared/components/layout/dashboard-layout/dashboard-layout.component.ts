import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
	IconDefinition,
	faBarsStaggered,
	faPlus,
	faEllipsisVertical,
	faChartSimple,
	faTags,
	faCartShopping,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { INavLink } from 'src/app/shared/interfaces/link.interface';
import { AuthService } from '../../../service/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-dashboard-layout',
	templateUrl: './dashboard-layout.component.html',
	styleUrls: ['./dashboard-layout.component.scss'],
})
export class DashboardLayoutComponent implements OnInit {
	connectedUser!: User;
	logoIcon!: IconDefinition;
	addIcon!: IconDefinition;
	moreIcon!: IconDefinition;
	logoutIcon!: IconDefinition;
	navLinks!: INavLink[];
	sidebarVisible = false;

	items: MenuItem[] | undefined;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.connectedUser = this.authService.getAuthLocal();
		this.logoIcon = faBarsStaggered;
		this.addIcon = faPlus;
		this.moreIcon = faEllipsisVertical;
		this.logoutIcon = faRightFromBracket;
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

		this.items = [
			{
				label: 'Logout',
				icon: 'pi pi-sign-out',
				command: () => {
					this.logout();
				},
			},
		];
	}

	logout() {
		this.authService.logout();
	}

	openModalAddNewProduct() {
		this.sidebarVisible = true;
	}
}
