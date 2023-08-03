import { Component, OnInit } from '@angular/core';
import {
	FormGroup,
	FormBuilder,
	Validators,
	FormControl,
} from '@angular/forms';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { IImage } from '../../../../shared/model/image.model';
import { ISocialProvider } from '../../../../shared/model/social-provider.model';
import { registerValidationMessages } from '../../validations/messages.validation';
import { inputEqualValidator } from '../../../../shared/validators/input-equal.validator';
import { Observable, map } from 'rxjs';
import { ProviderEnum } from '../../../../shared/enum/provider.enum';
import { AuthService } from '../../../../shared/service/auth.service';
import { Router } from '@angular/router';

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
	private regexEmail!: RegExp;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	registerValidationMessages!: any;

	showPasswordError$!: Observable<boolean>;
	confirmPasswordCtrl!: FormControl;
	passwordCtrl!: FormControl;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private router: Router,
	) {}

	ngOnInit(): void {
		this.hidePassword = false;
		this.socialProviders = [
			{
				label: 'Connect with Google',
				icon: faGoogle,
				color: 'primary',
				size: '100%',
				outline: false,
				name: ProviderEnum.GOOGLE,
			},
			{
				label: 'Connect with Github',
				icon: faGithub,
				color: 'primary',
				size: '100%',
				outline: false,
				name: ProviderEnum.GITHUB,
			},
		];

		this.image = {
			src: 'assets/img/auth/register.jpg',
			alt: '',
			position: 'top',
		};

		this.initFormControls();
		this.initRegistrationForm();
		this.initObservables();

		this.registerValidationMessages = registerValidationMessages;
	}

	onMainFormSubmit(): void {
		// eslint-disable-next-line no-console
		console.log(this.mainForm.value);
		this.registerWithEmail();
	}

	registerWithEmail(): void {
		this.authService.register(
			this.mainForm.value.email,
			this.mainForm.value.password.password,
		);

		this.mainForm.reset();
	}

	private initRegistrationForm(): void {
		this.regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

		this.mainForm = this.formBuilder.group({
			personnalInfos: this.personnalInfosForm,
			email: ['', [Validators.required, Validators.pattern(this.regexEmail)]],
			password: this.passwordForm,
		});
	}

	private initFormControls(): void {
		this.personnalInfosForm = this.formBuilder.group({
			firstname: [
				'',
				[
					Validators.required,
					Validators.minLength(
						registerValidationMessages.firstname.minlength.value,
					),
					Validators.maxLength(
						registerValidationMessages.firstname.maxlength.value,
					),
				],
			],
			lastname: [
				'',
				[
					Validators.required,
					Validators.minLength(
						registerValidationMessages.lastname.minlength.value,
					),
					Validators.maxLength(
						registerValidationMessages.lastname.maxlength.value,
					),
				],
			],
			username: [
				'',
				[
					Validators.required,
					Validators.minLength(
						registerValidationMessages.username.minlength.value,
					),
					Validators.maxLength(
						registerValidationMessages.username.maxlength.value,
					),
				],
			],
		});

		this.passwordCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(registerValidationMessages.password.minlength.value),
			Validators.maxLength(registerValidationMessages.password.maxlength.value),
		]);

		this.confirmPasswordCtrl = this.formBuilder.control('', [
			Validators.required,
			Validators.minLength(
				registerValidationMessages.confirmPassword.minlength.value,
			),
			Validators.maxLength(
				registerValidationMessages.confirmPassword.maxlength.value,
			),
		]);

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

	private initObservables(): void {
		this.showPasswordError$ = this.passwordForm.statusChanges.pipe(
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
