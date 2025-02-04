import { ProductColorEnum } from '@shared/enum/product.enum';
import { ChoiceItemType } from '@shared/model/input.interface';

export interface IProduct {
	id: string;
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

export type ISaveProduct = Omit<IProduct, 'id'>;
