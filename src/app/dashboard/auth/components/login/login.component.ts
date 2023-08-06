import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IImage } from '../../../../shared/model/image.model';
import { ISocialProvider } from '../../../../shared/model/social-provider.model';
import { loginValidationMessages } from '../../validations/messages.validation';
import { AuthService } from '../../../../shared/service/auth.service';
import {
	getAuthProviders,
	regexEmail,
} from '../../../../dashboard/utils/auth.utils';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	socialProviders!: ISocialProvider[];
	image!: IImage;
	hidePassword!: boolean;
	mainForm!: FormGroup;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	loginValidationMessages!: any;
	regexEmail!: RegExp;
	formErrorMessage!: string;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
	) {}

	ngOnInit(): void {
		this.hidePassword = false;
		this.socialProviders = getAuthProviders;

		this.initImage();
		this.initMainForm();

		this.loginValidationMessages = loginValidationMessages;
	}

	onMainFormSubmit(): void {
		// eslint-disable-next-line no-console
		console.log(this.mainForm.value);
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
		this.regexEmail = regexEmail;

		this.mainForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.pattern(this.regexEmail)]],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(
						loginValidationMessages.password.minlength.value,
					),
					Validators.maxLength(
						loginValidationMessages.password.maxlength.value,
					),
				],
			],
		});
	}

	private initImage(): void {
		this.image = {
			src: 'assets/img/auth/login.jpg',
			alt: '',
			position: 'top',
		};
	}
}
