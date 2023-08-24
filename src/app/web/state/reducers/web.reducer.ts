import { MetaReducer, combineReducers } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { log } from './web.meta-reducer';
import {
	IWebProductState,
	webProductFeatureKey,
	initialProductState,
	productReducer,
} from './web-product.reducer';
import {
	IWebCategoryState,
	categoryReducer,
	webCategoryFeatureKey,
	initialCategoryState,
} from './web-category.reducer';
import {
	IWebCartState,
	cartReducer,
	initialCartState,
	webCartFeatureKey,
} from './web-cart.reducer';

export const webFeatureKey = 'web';

export interface IWebState {
	[webCategoryFeatureKey]: IWebCategoryState;
	[webProductFeatureKey]: IWebProductState;
	[webCartFeatureKey]: IWebCartState;
}

export const initialWebState: IWebState = {
	[webCategoryFeatureKey]: initialCategoryState,
	[webProductFeatureKey]: initialProductState,
	[webCartFeatureKey]: initialCartState,
};

export const reducers = combineReducers(
	{
		[webCategoryFeatureKey]: categoryReducer,
		[webProductFeatureKey]: productReducer,
		[webCartFeatureKey]: cartReducer,
	},
	initialWebState,
);

export const metaReducers: MetaReducer[] = isDevMode() ? [log] : [];
