import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
	IconDefinition,
	faBarsStaggered,
	faPlus,
	faEllipsis,
	faChartSimple,
	faTags,
	faCartShopping,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { INavLink } from 'src/app/shared/interfaces/link.interface';
import { AuthService } from '../../../service/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalAddProductsComponent } from '../../modal/modal-add-products/modal-add-products.component';

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

	constructor(
		private authService: AuthService,
		public dialog: MatDialog,
	) {}

	ngOnInit(): void {
		this.connectedUser = this.authService.getAuthLocal();
		this.logoIcon = faBarsStaggered;
		this.addIcon = faPlus;
		this.moreIcon = faEllipsis;
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
	}

	logout() {
		this.authService.logout();
	}

	openModalAddNewProduct() {
		const dialogRef = this.dialog.open(ModalAddProductsComponent, {
			width: '400px',
			height: '100vh',
			position: { right: '0px', top: '0px' },
			panelClass: 'modal-add-product',
		});

		dialogRef.afterClosed().subscribe(() => {
			// eslint-disable-next-line no-console
			console.log('after close');
		});
	}
}
