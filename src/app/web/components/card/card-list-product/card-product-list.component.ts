import { Component, Input, OnInit } from '@angular/core';
import { CurrencyEnum } from '../../../../shared/enum/properties.enum';
import { Store } from '@ngrx/store';
import { IProduct } from '../../../../shared/model/product.model';
import { UserActions } from '../../../../core/state/user/actions/user-index.actions';
import { AuthService } from '../../../../shared/service/auth.service';
import { User } from '@angular/fire/auth';

@Component({
	selector: 'app-card-product-list',
	templateUrl: './card-product-list.component.html',
	styleUrls: ['./card-product-list.component.scss'],
})
export class CardProductListComponent implements OnInit {
	@Input() product!: IProduct;
	@Input() productsList!: IProduct[];

	currencyEnum = CurrencyEnum;
	connectedUser!: User;
	productsListIds!: (string | undefined)[];
	productInUserList!: boolean;

	constructor(
		private store: Store,
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		this.connectedUser = this.authService.getAuthLocal();
		this.productsListIds = this.productsList.map(product => product.id);

		this.productInUserList = this.productsListIds.includes(this.product.id);
	}

	addOrRemoveProductForUserList() {
		if (!this.productsListIds.includes(this.product.id)) {
			this.store.dispatch(
				UserActions.list.addProductInUserList({
					payload: { userId: this.connectedUser.uid, newProduct: this.product },
				}),
			);

			this.productsListIds = [...this.productsListIds, this.product.id];
		} else {
			this.store.dispatch(
				UserActions.list.deleteProductInUserList({
					payload: {
						userId: this.connectedUser.uid,
						product: this.product,
					},
				}),
			);

			this.productsListIds = this.productsListIds.filter(
				productId => productId !== this.product.id,
			);
		}

		this.productInUserList = !this.productInUserList;
	}
}
