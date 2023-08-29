import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { CartActions } from '../../../core/state/actions/cart-index.actions';

@Component({
	selector: 'app-delivery-information',
	templateUrl: './delivery-information.component.html',
	styleUrls: ['./delivery-information.component.scss'],
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

	constructor(
		private formBuilder: FormBuilder,
		private store: Store,
	) {}

	ngOnInit(): void {
		this.initFormControls();
		this.initFormGroups();
		this.initMainForm();
	}

	onMainFormSubmit(): void {
		this.addDelivery();
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
		this.store.dispatch(
			CartActions.delivery.addDeliveryToCart({
				payload: { data: this.mainForm.value },
			}),
		);
	}
}
