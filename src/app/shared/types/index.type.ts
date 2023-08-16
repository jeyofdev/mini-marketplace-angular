import { ConfirmationService, MessageService } from 'primeng/api';
import { ICategory } from '../model/category.model';
import { IProduct } from '../model/product.model';

export type ShowConfirmDialogFnType = (
	confirmationService: ConfirmationService,
	messageService: MessageService,
	acceptFn: (itemId: string) => void,
	itemId: string,
	itemName: string,
) => void;

export type FillFormWithCurrentCategoryFnType = (category: ICategory) => void;
export type FillFormWithCurrentProductFnType = (product: IProduct) => void;
