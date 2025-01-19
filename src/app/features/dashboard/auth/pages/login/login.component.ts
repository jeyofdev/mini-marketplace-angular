import { DataService } from '@shared/service/data.service';
import { Component, OnInit } from '@angular/core';
import {
	FormBuilder,
	FormControl,
	FormGroup,
	Validators,
} from '@angular/forms';
import { IImage } from '@shared/model/image.model';
import { ISocialProvider } from '@shared/model/social-provider.model';
import { loginValidationMessages } from '@dashboard/auth/validations/messages.validation';
import { AuthService } from '@shared/service/auth.service';
import { UserActions } from '@core/state/user/actions/user-index.actions';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { FirebaseError } from '@angular/fire/app';
import { catchError, map, Observable, of } from 'rxjs';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	socialProviders$!: Observable<ISocialProvider[]>;
	image!: IImage;
	hidePassword!: boolean;
	regexEmail!: RegExp;

	mainForm!: FormGroup;
	emailCtrl!: FormControl<string | null>;
	passwordCtrl!: FormControl<string | null>;

	formErrorMessage!: string | null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	inputsValidationMessages!: any;

	constructor(
		private formBuilder: FormBuilder,
		private authService: AuthService,
		private dataService: DataService,
		private router: Router,
		private store: Store,
	) {}

	ngOnInit(): void {
		this.hidePassword = false;
		this.socialProviders$ = this.dataService.getAuthProviders();
		this.inputsValidationMessages = loginValidationMessages;

		this.initImage();
		this.initFormControls();
		this.initMainForm();
	}

	onMainFormSubmit(): void {
		this.loginWithEmail();
	}

	loginWithEmail() {
		this.authService
			.login(this.mainForm.value.email, this.mainForm.value.password)
			.pipe(
				map(currentUser => {
					this.store.dispatch(
						UserActions.informations.loadUser({
							payload: { userId: currentUser.user.uid },
						}),
					);

					this.formErrorMessage = null;
					this.mainForm.reset();
					this.router.navigateByUrl('/home');
				}),
				catchError((error: unknown) => {
					if (error instanceof FirebaseError) {
						this.formErrorMessage = this.authService.setErrorMessage(
							error.code,
						);
					}
					return of(null);
				}),
			);
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
