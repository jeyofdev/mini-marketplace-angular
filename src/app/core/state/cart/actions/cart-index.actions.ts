import { CartDeliveryActions } from '@core/state/cart/actions/cart-delivery.actions';
import { CartProductActions } from '@core/state/cart/actions/cart-product.actions';

export const CartActions = {
	products: CartProductActions,
	delivery: CartDeliveryActions,
};
