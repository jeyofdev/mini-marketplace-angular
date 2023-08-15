import { ConfirmationService, MessageService } from 'primeng/api';
import { ICategory } from '../model/category.model';

export type ShowConfirmDialogFnType = (
	confirmationService: ConfirmationService,
	messageService: MessageService,
	acceptFn: (categoryId: string) => void,
	categoryId: string,
	itemName: string,
) => void;

export type FillFormWithCurrentCategoryFnType = (category: ICategory) => void;
