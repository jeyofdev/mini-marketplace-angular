import { Component, OnInit } from '@angular/core';
import { INavLink } from '@shared/model/link.interface';
import { DataService } from '@web/services/data.service';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
	navLinks$!: Observable<INavLink[]>;

	constructor(private dataService: DataService) {}

	ngOnInit(): void {
		this.navLinks$ = this.dataService.getNavigationLinks();
	}
}
