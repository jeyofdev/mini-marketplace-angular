import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';
import {
	IconDefinition,
	faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';
import { INavLink } from '../../../../shared/interfaces/link.interface';
import { AuthService } from '../../../../shared/service/auth.service';
import { MenuItem } from 'primeng/api';
import { DataService } from '../../../../shared/service/data.service';

@Component({
	selector: 'app-layout',
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
	connectedUser!: User;
	logoutIcon!: IconDefinition;
	navLinks!: INavLink[];
	sidebarVisible = false;

	items: MenuItem[] | undefined;

	constructor(
		private authService: AuthService,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this.authService.getAuthLocal();
		this.logoutIcon = faRightFromBracket;
		this.navLinks = this.dataService.getDashboardNavLinks();

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
