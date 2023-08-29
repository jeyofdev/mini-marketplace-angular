import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
	ConfirmEventType,
	ConfirmationService,
	MessageService,
} from 'primeng/api';
import { ShowCartConfirmDialogFnType } from '../../../../shared/types/index.type';

@Component({
	selector: 'app-confirm-delivery',
	templateUrl: './confirm-delivery.component.html',
	styleUrls: ['./confirm-delivery.component.scss'],
})
export class ConfirmDeliveryComponent implements OnInit {
	@Output() showConfirmDialog = new EventEmitter<ShowCartConfirmDialogFnType>();

	ngOnInit(): void {
		this.showConfirmDialog.emit(this.confirm);
	}

	confirm(
		confirmationService: ConfirmationService,
		messageService: MessageService,
	) {
		confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				messageService.add({
					severity: 'info',
					summary: 'Confirmed',
					detail: 'You have accepted',
				});
			},
			reject: (type: ConfirmEventType) => {
				switch (type) {
					case ConfirmEventType.REJECT:
						messageService.add({
							severity: 'error',
							summary: 'Rejected',
							detail: 'You have rejected',
						});
						break;
					case ConfirmEventType.CANCEL:
						messageService.add({
							severity: 'warn',
							summary: 'Cancelled',
							detail: 'You have cancelled',
						});
						break;
				}
			},
		});
	}
}
