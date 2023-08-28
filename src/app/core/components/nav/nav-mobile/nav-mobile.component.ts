import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../web/services/data.service';
import { INavLink } from '../../../../shared/interfaces/link.interface';

@Component({
	selector: 'app-nav-mobile',
	templateUrl: './nav-mobile.component.html',
	styleUrls: ['./nav-mobile.component.scss'],
})
export class NavMobileComponent implements OnInit {
	sidebarVisible!: boolean;
	navLinks!: INavLink[];

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.sidebarVisible = false;
		this.navLinks = this.dataService.getNavigationLinks();
	}
}
