import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { IImage } from 'src/app/shared/model/image.model';
import { ISocialProvider } from 'src/app/shared/model/social-provider.model';

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
	}

	onMainFormSubmit(): void {
		// eslint-disable-next-line no-console
		console.log(this.mainForm.value);
	}

	private initRegistrationForm(): void {
		this.mainForm = this.formBuilder.group({
			personnalInfos: this.personnalInfosForm,
			email: [''],
			password: this.passwordForm,
		});
	}

	private initFormControls(): void {
		this.personnalInfosForm = this.formBuilder.group({
			firstname: [''],
			lastname: [''],
			username: [''],
		});

		this.passwordForm = this.formBuilder.group({
			password: [''],
			confirmPassword: [''],
		});
	}
}
