import { ProductColorEnum, ProductSizeEnum } from '../enum/product.enum';

export interface ICartProduct {
	id?: string;
	brandName: string;
	modelName: string;
	size: ProductSizeEnum;
	quantity: number;
	price: number;
	color: ProductColorEnum;
}

export interface Icart {
	id: string;
	products: ICartProduct[];
}
