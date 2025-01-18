import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShowCartConfirmDialogFnType } from '@shared/types/index.type';
import { ConfirmationService } from 'primeng/api';

@Component({
	selector: 'app-confirm-delivery',
	templateUrl: './confirm-delivery.component.html',
	styleUrls: ['./confirm-delivery.component.scss'],
})
export class ConfirmDeliveryComponent implements OnInit {
	@Input() title!: string;
	@Input() itemName!: string;

	@Output() showConfirmDialog = new EventEmitter<ShowCartConfirmDialogFnType>();

	ngOnInit(): void {
		this.showConfirmDialog.emit(this.confirm);
	}

	confirm(confirmationService: ConfirmationService) {
		confirmationService.confirm({});
	}
}
