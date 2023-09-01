import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../../shared/model/product.model';
import { Store, select } from '@ngrx/store';
import { AuthService } from '../../../../shared/service/auth.service';
import { UserActions } from '../../../../core/state/user/actions/user-index.actions';
import { getUserListSelector } from '../../../../core/state/user/selectors/user-list.selectors';
import { map } from 'rxjs';

@Component({
	selector: 'app-product-list',
	templateUrl: './product-list.component.html',
	styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() products!: any | IProduct;
	@Input() loading!: boolean;

	productsList!: IProduct[];

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

		this.store.pipe(select(getUserListSelector));
		this.store
			.pipe(
				select(getUserListSelector),
				map(products => {
					this.productsList = products;
				}),
			)
			.subscribe();
	}
}
