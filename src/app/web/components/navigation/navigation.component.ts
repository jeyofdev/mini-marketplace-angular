import { Component, OnInit } from '@angular/core';
import { INavLink } from '../../../shared/interfaces/link.interface';
import { DataService } from '../../services/data.service';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
	navLinks!: INavLink[];

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.navLinks = this.dataService.getNavigationLinks();
	}
}
