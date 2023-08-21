import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataService } from '../../services/data.service';
import { User } from '@angular/fire/auth';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
	selector: 'app-header-user-action',
	templateUrl: './header-user-action.component.html',
	styleUrls: ['./header-user-action.component.scss'],
})
export class HeaderUserActionComponent implements OnInit {
	@Input() showSeparator!: boolean;
	@Input() direction!: 'row' | 'column';
	@Input() isMobile!: boolean;

	connectedUser!: User;
	items!: MenuItem[];
	userItems!: MenuItem[];
	class!: string;

	constructor(
		private authService: AuthService,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this.authService.getAuthLocal();
		this.class = 'actions-box';

		if (this.connectedUser && !this.isMobile) {
			this.items = this.dataService.getConnectedLinks();
			this.userItems = this.dataService.getUserConnectedLinks();
		} else if (this.connectedUser && this.isMobile) {
			const items = this.filterItems(
				this.dataService.getUserConnectedLinks()[0],
			);

			this.items = [...this.dataService.getConnectedLinks(), ...items];
		} else if (!this.connectedUser && this.isMobile) {
			const items = this.filterItems(
				this.dataService.getUserNotConnectedLinks()[0],
			);

			this.items = [...this.dataService.getNotConnectedLinks(), ...items];
		} else {
			this.items = this.dataService.getNotConnectedLinks();
			this.userItems = this.dataService.getUserNotConnectedLinks();
		}

		if (this.direction) {
			this.class += ' ' + this.direction;
		}
	}

	private filterItems(itemsMobile: MenuItem): MenuItem[] {
		return itemsMobile.items
			?.filter((item: MenuItem) => !item.separator)
			.map((item: MenuItem) => ({
				icon: item.icon,
				command: item.command,
			})) as MenuItem[];
	}
}
