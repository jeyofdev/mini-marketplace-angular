import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataService } from '@web/services/data.service';
import { User } from '@angular/fire/auth';
import { AuthService } from '@shared/service/auth.service';
import { CartComponent } from '@core/components/cart/cart/cart.component';
import { Router } from '@angular/router';
import { forkJoin, map, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
	selector: 'app-header-user-action',
	templateUrl: './header-user-action.component.html',
	styleUrls: ['./header-user-action.component.scss'],
})
export class HeaderUserActionComponent implements OnInit, OnDestroy {
	@ViewChild(CartComponent) cartPanel!: CartComponent;
	@Input() showSeparator!: boolean;
	@Input() direction!: 'row' | 'column';
	@Input() isMobile!: boolean;

	connectedUser!: User;
	items!: MenuItem[];
	userItems!: MenuItem[];
	class!: string;

	private destroy$ = new Subject<void>();

	constructor(
		private authService: AuthService,
		private dataService: DataService,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.connectedUser = this.authService.getAuthLocal();
		this.class = 'actions-box';

		if (this.direction) {
			this.class += ' ' + this.direction;
		}

		this.loadMenuItems();
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}

	toggleShowCart(event: Event): void {
		this.cartPanel.toggle(event);
	}

	goToWishListPage(): void {
		this.router.navigateByUrl('/wish-list');
	}

	private filterItems(itemsMobile: MenuItem): MenuItem[] {
		return itemsMobile.items
			?.filter((item: MenuItem) => !item.separator)
			.map((item: MenuItem) => ({
				icon: item.icon,
				command: item.command,
			})) as MenuItem[];
	}

	private loadMenuItems(): void {
		if (this.connectedUser && !this.isMobile) {
			this.loadDesktopConnectedLinks();
		} else if (this.connectedUser && this.isMobile) {
			this.loadMobileConnectedLinks();
		} else if (!this.connectedUser && this.isMobile) {
			this.loadMobileNotConnectedLinks();
		} else {
			this.loadDesktopNotConnectedLinks();
		}
	}

	private loadDesktopConnectedLinks(): void {
		forkJoin({
			items: this.dataService.getConnectedLinks(),
			userItems: this.dataService.getUserConnectedLinks(),
		})
			.pipe(takeUntil(this.destroy$))
			.subscribe(({ items, userItems }) => {
				this.items = items;
				this.userItems = userItems;
			});
	}

	private loadMobileConnectedLinks(): void {
		this.dataService
			.getUserConnectedLinks()
			.pipe(
				takeUntil(this.destroy$),
				switchMap(userLinks => {
					const filteredItems = this.filterItems(userLinks[0]);
					return this.dataService
						.getConnectedLinks()
						.pipe(map(links => [...links, ...filteredItems]));
				}),
			)
			.subscribe(items => (this.items = items));
	}

	private loadMobileNotConnectedLinks(): void {
		this.dataService
			.getUserNotConnectedLinks()
			.pipe(
				takeUntil(this.destroy$),
				switchMap(userLinks => {
					const filteredItems = this.filterItems(userLinks[0]);
					return this.dataService
						.getNotConnectedLinks()
						.pipe(map(links => [...links, ...filteredItems]));
				}),
			)
			.subscribe(items => (this.items = items));
	}

	private loadDesktopNotConnectedLinks(): void {
		forkJoin({
			items: this.dataService.getNotConnectedLinks(),
			userItems: this.dataService.getUserNotConnectedLinks(),
		})
			.pipe(takeUntil(this.destroy$))
			.subscribe(({ items, userItems }) => {
				this.items = items;
				this.userItems = userItems;
			});
	}
}
