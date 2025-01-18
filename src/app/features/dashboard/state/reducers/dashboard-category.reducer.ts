import { createReducer, on } from '@ngrx/store';
import { ICategory } from '@shared/model/category.model';
import { DashboardActions } from '@dashboard/state/actions/dashboard-index.actions';

export const dashboardCategoryFeatureKey = 'categories';

export interface IDashboardCategoryState {
	data: ICategory[];
	loading: boolean;
}

export interface State {
	readonly [dashboardCategoryFeatureKey]: IDashboardCategoryState;
}

export const initialCategoryState: IDashboardCategoryState = {
	data: [],
	loading: false,
};

export const categoryReducer = createReducer(
	initialCategoryState,
	on(DashboardActions.categories.loadCategories, state => {
		return {
			...state,
			loading: true,
		};
	}),

	on(DashboardActions.categories.loadCategoriesSuccess, (state, actions) => {
		return {
			...state,
			data: actions.payload.data,
			loading: false,
		};
	}),

	on(DashboardActions.categories.addCategorySuccess, (state, actions) => {
		return {
			...state,
			data: [...state.data, actions.payload.data],
		};
	}),

	on(DashboardActions.categories.updateCategorySuccess, (state, actions) => {
		const updatedCategory: ICategory[] = state.data.map(
			(existingCategory: ICategory) =>
				existingCategory.id === actions.payload.data.id
					? actions.payload.data
					: existingCategory,
		);

		return {
			...state,
			data: updatedCategory,
		};
	}),

	on(DashboardActions.categories.deleteCategorySuccess, (state, actions) => {
		return {
			...state,
			data: state.data.filter(category => category.id !== actions.payload.id),
		};
	}),
);
