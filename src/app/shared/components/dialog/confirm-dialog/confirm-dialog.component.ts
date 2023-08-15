import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShowConfirmDialogFnType } from '../../../types/index.type';

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
	@Output() showConfirmDialog = new EventEmitter<ShowConfirmDialogFnType>();

	ngOnInit(): void {
		this.showConfirmDialog.emit(this.confirm);
	}

	confirm(
		confirmationService: ConfirmationService,
		messageService: MessageService,
	): void {
		confirmationService.confirm({
			message: 'Are you sure that you want to proceed?',
			icon: 'pi pi-exclamation-triangle',
			accept: () => {
				messageService.add({
					severity: 'error',
					summary: 'deleted confirmed',
					detail: '',
				});
			},
		});
	}
}
