import { Component, Input, OnInit } from '@angular/core';
import { ICartProduct } from '../../../shared/model/cart.model';
import { DataService } from '../../services/data.service';
import { CurrencyEnum } from 'src/app/shared/enum/properties.enum';
import { IRowsPerPageSelectOptions } from '../../../shared/interfaces/table.interface';
import { Store } from '@ngrx/store';
import { WebActions } from '../../state/actions/web-index.actions';

@Component({
	selector: 'app-table-cart-products',
	templateUrl: './table-cart-products.component.html',
	styleUrls: ['./table-cart-products.component.scss'],
})
export class TableCartProductsComponent implements OnInit {
	@Input() products!: ICartProduct[];
	@Input() paginator!: boolean;
	@Input() rows!: number;
	@Input() rowsPerPageOptions!: IRowsPerPageSelectOptions[];
	@Input() first!: number;

	cols!: { header: string; field: string }[];
	totalRecords!: number;

	currencyEnum = CurrencyEnum;

	constructor(
		private dataService: DataService,
		private store: Store,
	) {}

	ngOnInit(): void {
		this.cols = this.dataService.getColsProducts();
		this.totalRecords = this.products.length;
	}

	onRowSelect(event: number) {
		this.first = 1;
		this.rows = event;
	}

	deleteProductInCart(productId: string): void {
		this.store.dispatch(
			WebActions.cart.deleteProductToCart({
				payload: {
					id: productId,
				},
			}),
		);
	}
}
