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

export type ISaveCartProduct = Omit<ICartProduct, 'id'>;
