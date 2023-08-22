import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { WebActions } from '../../state/actions/web-index.actions';
import { IProduct } from '../../../shared/model/product.model';
import { map } from 'rxjs';
import { getWebCurrentProductSelector } from '../../state/selectors/web-product.selectors';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	currentProduct!: IProduct;

	constructor(
		private activatedRoute: ActivatedRoute,
		private store: Store,
	) {}

	ngOnInit(): void {
		const { productId } = this.activatedRoute.snapshot.params;

		this.store.dispatch(
			WebActions.products.loadProduct({ payload: { id: productId } }),
		);

		this.store
			.pipe(
				select(getWebCurrentProductSelector),
				map(product => {
					this.currentProduct = product as IProduct;
				}),
			)
			.subscribe();
	}
}
