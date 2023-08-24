import { MessageService } from 'primeng/api';
import { ofType } from '@ngrx/effects';
import { ActionsSubject } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';

export const toastSuccess = (
	messageService: MessageService,
	message: string,
	form: FormGroup,
	onClose?: (arg: boolean) => void,
): void => {
	messageService.add({
		severity: 'success',
		summary: message,
	});

	form.reset();

	if (onClose) {
		onClose(false);
	}
};

export const toastError = (
	messageService: MessageService,
	message: string,
): void => {
	messageService.add({
		severity: 'error',
		summary: message,
	});
};

export const addSubscriptionAndShowToast = (
	subscription: Subscription,
	actionsSubject: ActionsSubject,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	actionSuccess: any,
	messageService: MessageService,
	message: string,
	form: FormGroup,
	onClose?: (arg: boolean) => void,
) => {
	subscription.add(
		actionsSubject.pipe(ofType(actionSuccess)).subscribe(() => {
			toastSuccess(messageService, message, form, onClose);
		}),
	);
};
