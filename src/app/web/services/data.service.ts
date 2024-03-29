import { Injectable } from '@angular/core';
import { INavLink } from '../../shared/interfaces/link.interface';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';
import { ITableColumns } from '../../shared/interfaces/table.interface';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	constructor(
		private router: Router,
		private authService: AuthService,
	) {}

	getNavigationLinks(): INavLink[] {
		return [
			{
				label: 'Home',
				routerLink: '/home',
				icon: 'fa-solid fa-house',
			},
			{
				label: 'Women',
				routerLink: '/women',
				icon: 'fa-solid fa-person-dress',
			},
			{
				label: 'Men',
				routerLink: '/men',
				icon: 'fa-solid fa-person',
			},
			{
				label: 'Children',
				routerLink: '/children',
				icon: 'fa-solid fa-child',
			},
		];
	}

	getUserActionsLinks(): MenuItem[] {
		return [
			{
				icon: 'fa-solid fa-cart-shopping',
				command: () => {
					this.router.navigateByUrl('/cart/summary');
				},
			},
		];
	}

	getConnectedLinks(): MenuItem[] {
		return [
			...this.getUserActionsLinks(),
			{
				icon: 'fa-solid fa-heart',
				command: () => {
					this.router.navigateByUrl('/wish-list');
				},
			},
		];
	}

	getNotConnectedLinks(): MenuItem[] {
		return [...this.getUserActionsLinks()];
	}

	getUserConnectedLinks(): MenuItem[] {
		return [
			{
				icon: 'fa-solid fa-user',
				items: [
					{
						label: 'Settings',
						icon: 'fa-solid fa-sliders',
					},
					{
						separator: true,
					},

					{
						label: 'Logout',
						icon: 'fa-solid fa-right-from-bracket',
						command: () => {
							this.authService.logout();
						},
					},
				],
			},
		];
	}

	getUserNotConnectedLinks(): MenuItem[] {
		return [
			{
				icon: 'fa-solid fa-user',
				items: [
					{
						label: 'Register',
						icon: 'fa-solid fa-user-plus',
						command: () => {
							this.router.navigateByUrl('/dashboard/auth/register');
						},
					},
					{
						separator: true,
					},
					{
						label: 'Log in',
						icon: 'fa-solid fa-right-to-bracket',
						command: () => {
							this.router.navigateByUrl('/dashboard/auth/login');
						},
					},
				],
			},
		];
	}

	getColsProducts(): ITableColumns[] {
		return [
			{
				field: 'brandName',
				header: 'Brand name',
			},
			{
				field: 'size',
				header: 'Size',
			},
			{
				field: 'quantity',
				header: 'Quantity',
			},
			{
				field: 'color',
				header: 'Color',
			},
			{
				field: 'price',
				header: 'Price',
			},
		];
	}
}
