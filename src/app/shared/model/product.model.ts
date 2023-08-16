import { ProductColorEnum } from '../enum/product.enum';
import { ISelectItem } from '../interfaces/input.interface';

export interface IProduct {
	id?: string;
	brandName: string;
	modelName: string;
	category: ISelectItem;
	size: ISelectItem;
	quantity: number;
	price: number;
	color: ProductColorEnum[];
}
