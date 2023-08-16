import { ConfirmationService, MessageService } from 'primeng/api';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShowConfirmDialogFnType } from '../../../types/index.type';
import { CategoryService } from '../../../service/category.service';

@Component({
	selector: 'app-confirm-dialog',
	templateUrl: './confirm-dialog.component.html',
	styleUrls: ['./confirm-dialog.component.scss'],
	providers: [CategoryService],
})
export class ConfirmDialogComponent implements OnInit {
	@Output() showConfirmDialog = new EventEmitter<ShowConfirmDialogFnType>();
	@Input() title!: string;
	@Input() itemName!: string;
	@Input() warningMessage!: string;

	ngOnInit(): void {
		this.showConfirmDialog.emit(this.confirm);
		this.warningMessage =
			'this action cannot be undone. this will permanently delete the category.';
	}

	confirm(
		confirmationService: ConfirmationService,
		messageService: MessageService,
		acceptFn: (categoryId: string) => void,
		categoryId: string,
		itemName: string,
	): void {
		confirmationService.confirm({
			message: `Are you sure you want to delete the category with name '${itemName}' ?`,
			accept: () => {
				acceptFn(categoryId);

				messageService.add({
					severity: 'error',
					summary: `The category '${itemName}' successfully deleted`,
					detail: '',
				});
			},
		});
	}
}
