import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShowConfirmDialogFnType } from '../../../types/index.type';
import {
	IconDefinition,
	faTriangleExclamation,
	faXmark,
} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit {
	@Output() showConfirmDialog = new EventEmitter<ShowConfirmDialogFnType>();
	@Input() title!: string;
	@Input() itemName!: string;
	@Input() warningMessage!: string;

	iconErrorAlert!: IconDefinition;
	iconClose!: IconDefinition;

	ngOnInit(): void {
		this.iconErrorAlert = faTriangleExclamation;
		this.iconClose = faXmark;

		this.showConfirmDialog.emit(this.confirm);
		this.warningMessage =
			'this action cannot be undone. this will permanently delete the category.';
	}

	confirm(
		confirmationService: ConfirmationService,
		messageService: MessageService,
	): void {
		confirmationService.confirm({
			message: `Are you sure you want to delete the category with name "test" ?`,
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
