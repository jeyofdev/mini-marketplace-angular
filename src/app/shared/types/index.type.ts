import { ConfirmationService, MessageService } from 'primeng/api';
import { ICategory } from '@shared/model/category.model';
import { IProduct } from '@shared/model/product.model';

export type ShowConfirmDialogFnType = (
	confirmationService: ConfirmationService,
	messageService: MessageService,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	action: any,
	itemId: string,
	itemName: string,
) => void;

export type FillFormWithCurrentCategoryFnType = (category: ICategory) => void;
export type FillFormWithCurrentProductFnType = (product: IProduct) => void;

export type ShowCartConfirmDialogFnType = (
	confirmationService: ConfirmationService,
) => void;
