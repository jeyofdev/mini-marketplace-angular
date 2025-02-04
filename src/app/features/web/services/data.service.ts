import { Injectable } from '@angular/core';
import { INavLink } from '@shared/model/link.interface';
import { MenuItem } from 'primeng/api';
import { AuthService } from '@shared/service/auth.service';
import { Router } from '@angular/router';
import { ITableColumns } from '@shared/model/table.interface';
import { map, Observable, of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DataService {
	constructor(
		private router: Router,
		private authService: AuthService,
	) {}

	getNavigationLinks(): Observable<INavLink[]> {
		return of([
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
		]);
	}

	getUserActionsLinks(): Observable<MenuItem[]> {
		return of([
			{
				icon: 'fa-solid fa-cart-shopping',
				command: () => {
					this.router.navigateByUrl('/cart/summary');
				},
			},
		]);
	}

	getConnectedLinks(): Observable<MenuItem[]> {
		return this.getUserActionsLinks().pipe(
			map(userActions => [
				...userActions,
				{
					icon: 'fa-solid fa-heart',
					command: () => {
						this.router.navigateByUrl('/wish-list');
					},
				},
			]),
		);
	}

	getNotConnectedLinks(): Observable<MenuItem[]> {
		return this.getUserActionsLinks();
	}

	getUserConnectedLinks(): Observable<MenuItem[]> {
		return of([
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
		]);
	}

	getUserNotConnectedLinks(): Observable<MenuItem[]> {
		return of([
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
		]);
	}

	getColsProducts(): Observable<ITableColumns[]> {
		return of([
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
		]);
	}
}
