import { Injectable } from '@angular/core';
import { INavLink } from '../../shared/interfaces/link.interface';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../shared/service/auth.service';
import { Router } from '@angular/router';

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
			},
			{
				label: 'Women',
				routerLink: '/women',
			},
			{
				label: 'Men',
				routerLink: '/men',
			},
			{
				label: 'Children',
				routerLink: '/children',
			},
		];
	}

	getUserActionsLinks(): MenuItem[] {
		return [
			{
				// label: 'cart',
				icon: 'fa-solid fa-cart-shopping',
			},
		];
	}

	getConnectedLinks(): MenuItem[] {
		return [
			...this.getUserActionsLinks(),
			{
				icon: 'fa-solid fa-heart',
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
}
