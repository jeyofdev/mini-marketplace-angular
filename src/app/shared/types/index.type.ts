import { ConfirmationService, MessageService } from 'primeng/api';

export type ShowConfirmDialogFnType = (
	confirmationService: ConfirmationService,
	messageService: MessageService,
) => void;
