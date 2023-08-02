import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { IImage } from 'src/app/shared/model/image.model';
import { ISocialProvider } from 'src/app/shared/model/social-provider.model';
import { registerValidationMessages } from '../../validations/messages.validation';

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

	constructor(private formBuilder: FormBuilder) {}

	ngOnInit(): void {
		this.hidePassword = false;
		this.socialProviders = [
			{
				label: 'Connect with Google',
				icon: faGoogle,
				color: 'primary',
				size: '100%',
				outline: false,
			},
			{
				label: 'Connect with Github',
				icon: faGithub,
				color: 'primary',
				size: '100%',
				outline: false,
			},
		];

		this.image = {
			src: 'assets/img/auth/register.jpg',
			alt: '',
			position: 'top',
		};

		this.initFormControls();
		this.initRegistrationForm();

		this.registerValidationMessages = registerValidationMessages;
	}

	onMainFormSubmit(): void {
		// eslint-disable-next-line no-console
		console.log(this.mainForm.value);
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

		this.passwordForm = this.formBuilder.group({
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(
						registerValidationMessages.password.minlength.value,
					),
					Validators.maxLength(
						registerValidationMessages.password.maxlength.value,
					),
				],
			],
			confirmPassword: [
				'',
				[
					Validators.required,
					Validators.minLength(
						registerValidationMessages.confirmPassword.minlength.value,
					),
					Validators.maxLength(
						registerValidationMessages.confirmPassword.maxlength.value,
					),
				],
			],
		});
	}
}
