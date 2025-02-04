import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICategory, ISaveCategory } from '@shared/model/category.model';

export const DashboardCategoryActions = createActionGroup({
	source: 'Category',
	events: {
		'Load Categories': emptyProps(),
		'Load Categories Success': props<{ payload: { data: ICategory[] } }>(),
		'Load Categories Failure': props<{ payload: { error: unknown } }>(),

		'Add Category': props<{ payload: { data: ISaveCategory } }>(),
		'Add Category Success': props<{ payload: { data: ICategory } }>(),
		'Add Category Failure': props<{ payload: { error: unknown } }>(),

		'Update Category': props<{
			payload: { id: string; data: ISaveCategory };
		}>(),
		'Update Category Success': props<{
			payload: { id: string; data: ISaveCategory };
		}>(),
		'Update Category Failure': props<{ payload: { error: unknown } }>(),

		'Delete Category': props<{ payload: { id: string } }>(),
		'Delete Category Success': props<{ payload: { id: string } }>(),
		'Delete Category Failure': props<{ payload: { error: unknown } }>(),
	},
});
