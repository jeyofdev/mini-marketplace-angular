import { ProductColorEnum, ProductSizeEnum } from '@shared/enum/product.enum';

export interface ICartProduct {
	id?: string;
	brandName: string;
	modelName: string;
	size: ProductSizeEnum;
	quantity: number;
	price: number;
	color: ProductColorEnum;
}

export interface ICartDelivery {
	id?: string;
	firstname: string;
	lastname: string;
	phone: string;
	email: string;
	city: string;
	country: string;
	postalCode: string;
	address: string;
}

export interface Icart {
	id: string;
	products: ICartProduct[];
	delivery: ICartDelivery[];
}
