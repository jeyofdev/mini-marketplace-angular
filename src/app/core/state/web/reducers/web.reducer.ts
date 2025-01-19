import { MetaReducer, combineReducers } from '@ngrx/store';
import { isDevMode } from '@angular/core';
import { log } from '@core/state/web//reducers/web.meta-reducer';
import {
	IWebProductState,
	webProductFeatureKey,
	initialProductState,
	productReducer,
} from '@core/state/web//reducers/web-product.reducer';
import {
	IWebCategoryState,
	categoryReducer,
	webCategoryFeatureKey,
	initialCategoryState,
} from '@core/state/web//reducers/web-category.reducer';

export const webFeatureKey = 'web';

export interface IWebState {
	[webCategoryFeatureKey]: IWebCategoryState;
	[webProductFeatureKey]: IWebProductState;
}

export const initialWebState: IWebState = {
	[webCategoryFeatureKey]: initialCategoryState,
	[webProductFeatureKey]: initialProductState,
};

export const reducers = combineReducers(
	{
		[webCategoryFeatureKey]: categoryReducer,
		[webProductFeatureKey]: productReducer,
	},
	initialWebState,
);

export const metaReducers: MetaReducer[] = isDevMode() ? [log] : [];
