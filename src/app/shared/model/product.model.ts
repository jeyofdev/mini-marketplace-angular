import { ProductColorEnum } from '@shared/enum/product.enum';
import { ChoiceItemType } from '@shared/interfaces/input.interface';

export interface IProduct {
	id?: string;
	brandName: string;
	modelName: string;
	category: ChoiceItemType;
	size: ChoiceItemType | ChoiceItemType[];
	quantity: number;
	price: number;
	color: ProductColorEnum[];
	options: string[];
	status: string;
}
