import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '@web/services/data.service';
import { CurrencyEnum } from '@shared/enum/properties.enum';
import { IRowsPerPageSelectOptions } from '@shared/model/table.interface';
import { Store } from '@ngrx/store';
import { CartActions } from '@core/state/cart/actions/cart-index.actions';
import { ICartProduct } from '@shared/model/cart/cart-product.model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-products-list',
	templateUrl: './products-list.component.html',
	styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
	@Input() products!: ICartProduct[];
	@Input() paginator!: boolean;
	@Input() rows!: number;
	@Input() rowsPerPageOptions!: IRowsPerPageSelectOptions[];
	@Input() first!: number;

	cols$!: Observable<{ header: string; field: string }[]>;
	totalRecords!: number;

	currencyEnum = CurrencyEnum;

	constructor(
		private dataService: DataService,
		private store: Store,
	) {}

	ngOnInit(): void {
		this.cols$ = this.dataService.getColsProducts();
		this.totalRecords = this.products.length;
	}

	onRowSelect(event: number) {
		this.first = 1;
		this.rows = event;
	}

	deleteProductInCart(productId: string): void {
		this.store.dispatch(
			CartActions.products.deleteProductToCart({
				payload: {
					id: productId,
				},
			}),
		);
	}
}
