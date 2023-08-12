import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { IImage } from '../../../../shared/model/image.model';
import { ISocialProvider } from '../../../../shared/model/social-provider.model';
import { loginValidationMessages } from '../../validations/messages.validation';
import { AuthService } from '../../../../shared/service/auth.service';
import { getAuthProviders } from '../../../../dashboard/utils/auth.utils';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	socialProviders!: ISocialProvider[];
	image!: IImage;
	hidePassword!: boolean;
	regexEmail!: RegExp;

	mainForm!: FormGroup;
	emailCtrl!: FormControl<string | null>;
	passwordCtrl!: FormControl<string | null>;

	formErrorMessage!: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	inputsValidationMessages!: any;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		this.hidePassword = false;
		this.socialProviders = getAuthProviders;
		this.inputsValidationMessages = loginValidationMessages;

		this.initImage();
		this.initFormControls();
		this.initMainForm();
	}

	onMainFormSubmit(): void {
		this.loginWithEmail();
	}

	async loginWithEmail() {
		await this.authService.login(
			this.mainForm.value.email,
			this.mainForm.value.password,
		);

		if (this.authService.errorMessage) {
			this.formErrorMessage = this.authService.errorMessage;
		} else {
			this.mainForm.reset();
		}
	}

	private initMainForm() {
		this.mainForm = this.formBuilder.group({
			email: this.emailCtrl,
			password: this.passwordCtrl,
		});
	}

	private initFormControls(): void {
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
	}

	private initImage(): void {
		this.image = {
			src: 'assets/img/auth/login.jpg',
			alt: '',
			position: 'top',
		};
	}
}
