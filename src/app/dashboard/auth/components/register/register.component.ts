import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
} from '@angular/forms';
import { IImage } from '../../../../shared/model/image.model';
import { ISocialProvider } from '../../../../shared/model/social-provider.model';
import { registerValidationMessages } from '../../validations/messages.validation';
import { inputEqualValidator } from '../../../../shared/validators/input-equal.validator';
import { Observable, map } from 'rxjs';
import { AuthService } from '../../../../shared/service/auth.service';
import { DataService } from '../../../../shared/service/data.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
	socialProviders!: ISocialProvider[];
	image!: IImage;
	hidePassword!: boolean;

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
	formErrorMessage!: string | null;
	showPasswordEqualError$!: Observable<boolean>;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private dataService: DataService,
	) {}

	ngOnInit(): void {
		this.hidePassword = false;
		this.socialProviders = this.dataService.getAuthProviders();
		this.inputsValidationMessages = registerValidationMessages;

		this.initImage();

		this.initFormControls();
		this.initFormGroups();
		this.initMainForm();
		this.initObservables();
	}

	onMainFormSubmit(): void {
		this.registerWithEmail();
	}

	async registerWithEmail() {
		await this.authService.register(
			this.mainForm.value.email,
			this.mainForm.value.password.password,
			`${this.mainForm.value.personnalInfos.firstname} ${this.mainForm.value.personnalInfos.lastname}`,
		);

		if (this.authService.errorMessage) {
			this.formErrorMessage = this.authService.errorMessage;
		} else {
			this.formErrorMessage = null;
			this.mainForm.reset();
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

	private initImage(): void {
		this.image = {
			src: 'assets/img/auth/register.jpg',
			alt: '',
			position: 'top',
		};
	}
}
