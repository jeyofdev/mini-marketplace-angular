import { ICartProduct } from '@shared/model/cart/cart-product.model';
import { ICartDelivery } from '@shared/model/cart/cart-delivery.model';

export interface Icart {
	id: string;
	products: ICartProduct[];
	delivery: ICartDelivery[];
}
