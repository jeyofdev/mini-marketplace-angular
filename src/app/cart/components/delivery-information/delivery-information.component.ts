import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CartActions } from '../../../core/state/actions/cart-index.actions';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ShowCartConfirmDialogFnType } from '../../../shared/types/index.type';

@Component({
	selector: 'app-delivery-information',
	templateUrl: './delivery-information.component.html',
	styleUrls: ['./delivery-information.component.scss'],
	providers: [ConfirmationService, MessageService],
})
export class DeliveryInformationComponent implements OnInit {
	mainForm!: FormGroup;
	infosForm!: FormGroup;
	addressForm!: FormGroup;

	firstnameCtrl!: FormControl<string | null>;
	lastnameCtrl!: FormControl<string | null>;
	phoneCtrl!: FormControl<string | null>;
	emailCtrl!: FormControl<string | null>;
	cityCtrl!: FormControl<string | null>;
	countryCtrl!: FormControl<string | null>;
	postalCodeCtrl!: FormControl<string | null>;
	addressCtrl!: FormControl<string | null>;

	showConfirmDialogFn!: ShowCartConfirmDialogFnType;

	constructor(
		private formBuilder: FormBuilder,
		private store: Store,
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
	) {}

	ngOnInit(): void {
		this.initFormControls();
		this.initFormGroups();
		this.initMainForm();
	}

	onMainFormSubmit(): void {
		this.addDelivery();
	}

	onAffich(showConfirmDialogFn: ShowCartConfirmDialogFnType) {
		this.showConfirmDialogFn = showConfirmDialogFn;
	}

	private initMainForm() {
		this.mainForm = this.formBuilder.group({
			infos: this.infosForm,
			address: this.addressForm,
		});
	}

	private initFormGroups(): void {
		this.infosForm = this.formBuilder.group({
			firstname: this.firstnameCtrl,
			lastname: this.lastnameCtrl,
			phone: this.phoneCtrl,
			email: this.emailCtrl,
		});

		this.addressForm = this.formBuilder.group({
			city: this.cityCtrl,
			country: this.countryCtrl,
			postalCode: this.postalCodeCtrl,
			address: this.addressCtrl,
		});
	}

	private initFormControls(): void {
		this.firstnameCtrl = this.formBuilder.control('', []);
		this.lastnameCtrl = this.formBuilder.control('', []);
		this.phoneCtrl = this.formBuilder.control('', []);
		this.emailCtrl = this.formBuilder.control('', []);

		this.cityCtrl = this.formBuilder.control('', []);
		this.countryCtrl = this.formBuilder.control('', []);
		this.postalCodeCtrl = this.formBuilder.control('', []);
		this.addressCtrl = this.formBuilder.control('', []);
	}

	private addDelivery(): void {
		// eslint-disable-next-line no-console
		console.log(
			this.showConfirmDialogFn(this.confirmationService, this.messageService),
		);

		// this.store.dispatch(
		// 	CartActions.delivery.addDeliveryToCart({
		// 		payload: { data: this.mainForm.value },
		// 	}),
		// );
	}
}
