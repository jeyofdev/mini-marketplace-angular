import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICategory } from 'src/app/shared/model/category.model';

export const CategoryActions = createActionGroup({
	source: 'Category',
	events: {
		'Load Categories': emptyProps(),
		'Load Categories Success': props<{ payload: { data: ICategory[] } }>(),
		'Load Categories Failure': props<{ payload: { error: unknown } }>(),
	},
});
