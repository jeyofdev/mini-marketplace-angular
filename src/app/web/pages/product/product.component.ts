import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { WebActions } from '../../state/actions/web-index.actions';
import { IProduct } from '../../../shared/model/product.model';
import { Observable, map } from 'rxjs';
import {
	getWebCurrentProductLoadingSelector,
	getWebCurrentProductSelector,
} from '../../state/selectors/web-product.selectors';
import { IImage } from '../../../shared/model/image.model';
import { BreakpointEnum } from '../../../shared/enum/breakpoint.enum';
import { BreakpointService } from '../../../shared/service/breakpoint.service';
import {
	IChoiceItem,
	IColorItem,
} from '../../../shared/interfaces/item.interface';
import { DataService } from '../../../shared/service/data.service';

@Component({
	selector: 'app-product',
	templateUrl: './product.component.html',
	styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
	currentProduct!: IProduct;
	loading$!: Observable<boolean>;
	image!: IImage;

	windowSize!: number;
	breakpoint!: BreakpointEnum;
	currentBreakpoint!: string;
	containerMaxHeight!: string;

	rating = 3.5;
	messages = [];

	sizes!: IChoiceItem[];
	colors!: IColorItem[];
	price!: string;

	constructor(
		private activatedRoute: ActivatedRoute,
		private store: Store,
		private breakpointService: BreakpointService,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		const { productId } = this.activatedRoute.snapshot.params;

		this.store.dispatch(
			WebActions.products.loadProduct({ payload: { id: productId } }),
		);
		this.loading$ = this.store.pipe(
			select(getWebCurrentProductLoadingSelector),
		);

		this.store
			.pipe(
				select(getWebCurrentProductSelector),
				map(product => {
					this.currentProduct = product as IProduct;
				}),
			)
			.subscribe();

		this.containerMaxHeight = '740px';
		this.initImage();

		this.sizes = this.dataService.getAllSizes();
		this.colors = this.dataService.getAllColors();
		this.price = '25';
	}

	minValueByBreakpoint(Breakpoint: BreakpointEnum | string) {
		return this.breakpointService.getMinValueByBreakpoint(Breakpoint);
	}

	getMaxHeightContainer(): string {
		if (this.windowSize >= this.minValueByBreakpoint('md')) {
			return this.containerMaxHeight;
		}

		return 'none';
	}

	private initImage(): void {
		this.image = {
			src: 'assets/img/auth/login.jpg',
			alt: '',
			position: 'top',
		};
	}
}
