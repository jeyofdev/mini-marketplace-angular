import { ProductColorEnum } from '../enum/product.enum';

export interface IProduct {
	brandName: string;
	modelName: string;
	category: string;
	size: string;
	quantity: number;
	price: number;
	color: ProductColorEnum[];
}
