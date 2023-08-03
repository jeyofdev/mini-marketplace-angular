import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
	selector: 'app-dashboard-home',
	templateUrl: './dashboard-home.component.html',
	styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent implements OnInit {
	constructor(public authService: AuthService) {}

	ngOnInit(): void {
		this.authService.getAuthLocal();
	}

	logout() {
		this.authService.logout();
	}
}
