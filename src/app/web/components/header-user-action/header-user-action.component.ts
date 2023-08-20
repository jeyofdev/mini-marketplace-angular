import { Component, OnInit } from '@angular/core';
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
	connectedUser!: User;
	items!: MenuItem[];
	userItems!: MenuItem[];

	constructor(
		private authService: AuthService,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this.authService.getAuthLocal();

		if (this.connectedUser) {
			this.items = this.dataService.getConnectedLinks();
			this.userItems = this.dataService.getUserConnectedLinks();
		} else {
			this.items = this.dataService.getNotConnectedLinks();
			this.userItems = this.dataService.getUserNotConnectedLinks();
		}
	}
}
