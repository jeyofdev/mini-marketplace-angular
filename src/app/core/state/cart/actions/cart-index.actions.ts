import { CartDeliveryActions } from './cart-delivery.actions';
import { CartProductActions } from './cart-product.actions';

export const CartActions = {
	products: CartProductActions,
	delivery: CartDeliveryActions,
};
