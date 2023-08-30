import { Component, Input } from '@angular/core';
import { CurrencyEnum } from '../../../../shared/enum/properties.enum';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../../core/state/user/actions/user-index.actions';
import { IProduct } from '../../../../shared/model/product.model';

@Component({
	selector: 'app-card-product-list',
	templateUrl: './card-product-list.component.html',
	styleUrls: ['./card-product-list.component.scss'],
})
export class CardProductListComponent {
	@Input() product!: IProduct;
	@Input() productsList!: IProduct[];

	currencyEnum = CurrencyEnum;

	constructor(private store: Store) {}

	addOrRemoveProductForUserList() {
		const productsModelName = this.productsList.map(
			product => product.modelName,
		);

		if (!productsModelName.includes(this.product.modelName)) {
			this.store.dispatch(
				UserActions.list.addProductInUserList({
					payload: { data: this.product },
				}),
			);
		}
	}
}
