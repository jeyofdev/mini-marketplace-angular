import { ProductColorEnum } from '../enum/product.enum';
import { ChoiceItemType } from '../interfaces/input.interface';

export interface IProduct {
	id?: string;
	brandName: string;
	modelName: string;
	category: ChoiceItemType;
	size: ChoiceItemType;
	quantity: number;
	price: number;
	color: ProductColorEnum[];
	status: string;
}
