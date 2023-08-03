import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { IImage } from '../../../../shared/model/image.model';
import { ISocialProvider } from '../../../../shared/model/social-provider.model';
import { loginValidationMessages } from '../../validations/messages.validation';
import { ProviderEnum } from '../../../../shared/enum/provider.enum';
import { AuthService } from 'src/app/shared/service/auth.service';

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
			src: 'assets/img/auth/login.jpg',
			alt: '',
			position: 'top',
		};

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
		this.regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

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
}
