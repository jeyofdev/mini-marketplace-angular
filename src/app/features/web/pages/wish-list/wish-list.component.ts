import { AuthService } from '@shared/service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IProduct } from '@shared/model/product.model';
import { Store, select } from '@ngrx/store';
import { UserActions } from '@core/state/user/actions/user-index.actions';
import {
	getUserListLoadingSelector,
	getUserListSelector,
} from '@core/state/user/selectors/user-list.selectors';

@Component({
	selector: 'app-wish-list',
	templateUrl: './wish-list.component.html',
	styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
	loading$!: Observable<boolean>;
	products!: IProduct[];
	filteredProducts!: IProduct[];

	constructor(
		private store: Store,
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		const connectedUser = this.authService.getAuthLocal();

		this.store.dispatch(
			UserActions.list.loadUserList({
				payload: { userId: connectedUser?.uid },
			}),
		);

		this.loading$ = this.store.pipe(select(getUserListLoadingSelector));

		this.store
			.pipe(
				select(getUserListSelector),
				map(products => {
					this.products = products;
					this.filteredProducts = this.getFilteredProducts(products);
				}),
			)
			.subscribe();
	}

	getFilteredProducts(products: IProduct[]) {
		return products;
	}
}
