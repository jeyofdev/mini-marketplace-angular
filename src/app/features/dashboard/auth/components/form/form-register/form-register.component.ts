import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { registerValidationMessages } from '@dashboard/auth/validations/messages.validation';
import { inputEqualValidator } from '@shared/validators/input-equal.validator';
import { map, Observable } from 'rxjs';

@Component({
	selector: 'app-form-register',
	templateUrl: './form-register.component.html',
	styleUrls: ['./form-register.component.scss'],
})
export class FormRegisterComponent implements OnInit {
	@Input() formErrorMessage!: string | null;
	@Output() submitForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

	hidePassword!: boolean;
	showPasswordEqualError$!: Observable<boolean>;

	mainForm!: FormGroup;
	personnalInfosForm!: FormGroup;
	passwordForm!: FormGroup;

	firstnameCtrl!: FormControl<string | null>;
	lastnameCtrl!: FormControl<string | null>;
	usernameCtrl!: FormControl<string | null>;
	emailCtrl!: FormControl<string | null>;
	confirmPasswordCtrl!: FormControl;
	passwordCtrl!: FormControl;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	inputsValidationMessages!: any;

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.hidePassword = false;
		this.inputsValidationMessages = registerValidationMessages;

		this.initFormControls();
		this.initFormGroups();
		this.initMainForm();
		this.initObservables();
	}

	onMainFormSubmit(): void {
		if (this.mainForm.valid) {
			this.submitForm.emit(this.mainForm);
		}
	}

	private initMainForm(): void {
		this.mainForm = this.formBuilder.group({
			personnalInfos: this.personnalInfosForm,
			email: this.emailCtrl,
			password: this.passwordForm,
		});
	}

	private initFormGroups(): void {
		this.personnalInfosForm = this.formBuilder.group({
			firstname: this.firstnameCtrl,
			lastname: this.lastnameCtrl,
			username: this.usernameCtrl,
		});

		this.passwordForm = this.formBuilder.group(
			{
				password: this.passwordCtrl,
				confirmPassword: this.confirmPasswordCtrl,
			},
			{
				updateOn: 'change',
				validators: [inputEqualValidator('password', 'confirmPassword')],
			},
		);
	}

	private initFormControls(): void {
		this.firstnameCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(
				registerValidationMessages.firstname.minlength.value,
			),
			Validators.maxLength(
				registerValidationMessages.firstname.maxlength.value,
			),
		]);

		this.lastnameCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(
				this.inputsValidationMessages.lastname.minlength.value,
			),
			Validators.maxLength(
				this.inputsValidationMessages.lastname.maxlength.value,
			),
		]);

		this.usernameCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(
				this.inputsValidationMessages.username.minlength.value,
			),
			Validators.maxLength(
				this.inputsValidationMessages.username.maxlength.value,
			),
		]);

		this.emailCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.pattern(this.inputsValidationMessages.email.pattern.regex),
		]);

		this.passwordCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(
				this.inputsValidationMessages.password.minlength.value,
			),
			Validators.maxLength(
				this.inputsValidationMessages.password.maxlength.value,
			),
		]);

		this.confirmPasswordCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(
				this.inputsValidationMessages.confirmPassword.minlength.value,
			),
			Validators.maxLength(
				this.inputsValidationMessages.confirmPassword.maxlength.value,
			),
		]);
	}

	private initObservables(): void {
		this.showPasswordEqualError$ = this.passwordForm.statusChanges.pipe(
			map(
				status =>
					status === 'INVALID' &&
					this.passwordCtrl.value &&
					this.confirmPasswordCtrl.value &&
					this.passwordForm.hasError('confirmEqual'),
			),
		);
	}
}
