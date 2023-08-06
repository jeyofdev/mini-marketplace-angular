/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, Inject, OnInit, inject } from '@angular/core';
import {
	MAT_SNACK_BAR_DATA,
	MatSnackBarRef,
} from '@angular/material/snack-bar';
import { IconDefinition, faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-toast',
	templateUrl: './toast.component.html',
	styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
	icon!: IconDefinition;
	snackBarRef = inject(MatSnackBarRef);

	constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {}

	ngOnInit(): void {
		this.icon = faXmark;
	}
}
