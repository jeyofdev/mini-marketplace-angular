import { Component, Input, OnInit } from '@angular/core';
import { CurrencyEnum } from '../../../../shared/enum/properties.enum';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../../core/state/user/actions/user-index.actions';
import { IProduct } from '../../../../shared/model/product.model';

@Component({
	selector: 'app-card-product-list',
	templateUrl: './card-product-list.component.html',
	styleUrls: ['./card-product-list.component.scss'],
})
export class CardProductListComponent implements OnInit {
	@Input() product!: IProduct;

	currencyEnum = CurrencyEnum;

	constructor(private store: Store) {}

	ngOnInit(): void {
		// eslint-disable-next-line no-console
		console.log('get');
	}

	addOrRemoveProductForUserList() {
		this.store.dispatch(
			UserActions.list.addProductToUserList({
				payload: { data: this.product },
			}),
		);
	}
}
