import { ConfirmationService, MessageService } from 'primeng/api';

export type ShowConfirmDialogFnType = (
	confirmationService: ConfirmationService,
	messageService: MessageService,
	acceptFn: (categoryId: string) => void,
	categoryId: string,
) => void;
