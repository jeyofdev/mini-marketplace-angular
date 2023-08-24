import { WebCartActions } from './web-cart.actions';
import { WebCategoryActions } from './web-category.actions';
import { WebProductActions } from './web-product.actions';

export const WebActions = {
	categories: WebCategoryActions,
	products: WebProductActions,
	cart: WebCartActions,
};
