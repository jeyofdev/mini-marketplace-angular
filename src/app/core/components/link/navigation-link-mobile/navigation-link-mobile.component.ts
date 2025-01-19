import { Component, OnInit } from '@angular/core';
import { DataService } from '@web/services/data.service';
import { INavLink } from '@shared/interfaces/link.interface';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-navigation-link-mobile',
	templateUrl: './navigation-link-mobile.component.html',
	styleUrls: ['./navigation-link-mobile.component.scss'],
})
export class NavigationLinkMobileComponent implements OnInit {
	navLinks$!: Observable<INavLink[]>;

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.navLinks$ = this.dataService.getNavigationLinks();
	}
}
