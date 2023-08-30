import { createReducer, on } from '@ngrx/store';
import { WebActions } from '../actions/web-index.actions';
import { ICategory } from '../../../../shared/model/category.model';

export const webCategoryFeatureKey = 'categories';

export interface IWebCategoryState {
	data: ICategory[];
	loading: boolean;
}

export interface State {
	readonly [webCategoryFeatureKey]: IWebCategoryState;
}

export const initialCategoryState: IWebCategoryState = {
	data: [],
	loading: false,
};

export const categoryReducer = createReducer(
	initialCategoryState,
	on(WebActions.categories.loadCategories, state => {
		return {
			...state,
			loading: true,
		};
	}),

	on(WebActions.categories.loadCategoriesSuccess, (state, actions) => {
		return {
			...state,
			data: actions.payload.data,
			loading: false,
		};
	}),
);
