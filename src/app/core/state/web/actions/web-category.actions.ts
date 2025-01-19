import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ICategory } from '@shared/model/category.model';

export const WebCategoryActions = createActionGroup({
	source: 'Web Category',
	events: {
		'Load Categories': emptyProps(),
		'Load Categories Success': props<{ payload: { data: ICategory[] } }>(),
		'Load Categories Failure': props<{ payload: { error: unknown } }>(),
	},
});
