import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-breadcrumb',
	templateUrl: './breadcrumb.component.html',
	styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
	menuItems!: MenuItem[] | undefined;
	home: MenuItem | undefined;

	constructor(
		private router: Router,
		private route: ActivatedRoute,
	) {}

	ngOnInit(): void {
		this.home = { icon: 'fa-solid fa-house', routerLink: '/' };
		this.createBreadcrumbs(this.route.root);
	}

	createBreadcrumbs(route: ActivatedRoute, breadcrumbs: MenuItem[] = []): void {
		const children: ActivatedRoute[] = route.children;

		if (children.length === 0) {
			this.menuItems = breadcrumbs;
		}

		this.addTobreadcrumbs(breadcrumbs, {
			label: children[0].snapshot.data['breadcrumb'],
		});

		const childLabel = this.route.snapshot.data['breadcrumb'];
		if (childLabel) {
			this.addTobreadcrumbs(breadcrumbs, { label: childLabel }, true);
		}

		this.menuItems = breadcrumbs;
	}

	private addTobreadcrumbs(
		breadcrumbs: MenuItem[],
		newItem: MenuItem,
		isChild = false,
	): void {
		const parentUrl = this?.router?.config[0]?.path;

		let routerLink = `/${parentUrl}/`;
		routerLink += !isChild ? this.route.snapshot.url[0].path : 'home';

		breadcrumbs.push({
			label: newItem.label,
			routerLink,
			routerLinkActiveOptions: { exact: true },
			icon: newItem.icon,
		});
	}
}
