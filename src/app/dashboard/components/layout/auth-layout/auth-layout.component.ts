import { GoogleAuthProvider, GithubAuthProvider } from '@angular/fire/auth';
import { BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { BreakpointEnum } from '../../../../shared/enum/breakpoint.enum';
import { ProviderEnum } from '../../../../shared/enum/provider.enum';
import { IImage } from '../../../../shared/model/image.model';
import { ISocialProvider } from '../../../../shared/model/social-provider.model';
import { BreakpointService } from '../../../../shared/service/breakpoint.service';
import { ResizeService } from '../../../../shared/service/resize.service';
import { AuthService } from '../../../../shared/service/auth.service';
import { UserService } from '../../../../core/service/user.service';
import { Router } from '@angular/router';
import { IUser } from '../../../../core/model/user.model';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../../core/state/user/actions/user-index.actions';

@Component({
	selector: 'app-auth-layout',
	templateUrl: './auth-layout.component.html',
	styleUrls: ['./auth-layout.component.scss'],
})
export class AuthLayoutComponent implements OnInit {
	@Input() pageTitle!: string;
	@Input() subtitle!: string;
	@Input() image!: IImage;
	@Input() socialProviders!: ISocialProvider[];
	@Input() containerMaxHeight!: string;

	windowSize!: number;
	breakpointValue!: number;
	breakpoint!: BreakpointEnum;

	currentBreakpoint!: string;

	constructor(
		private resizeService: ResizeService,
		private breakpointService: BreakpointService,
		private authService: AuthService,
		private userService: UserService,
		private router: Router,
		private store: Store,
	) {}

	ngOnInit(): void {
		this.detectScreenSize();
		this.setResizeBreakpoint();
	}

	detectScreenSize() {
		this.windowSize = this.resizeService.getScreenWidth();
		this.breakpointValue =
			window.innerWidth < this.minValueByBreakpoint('md') ? 1 : 2;
	}

	minValueByBreakpoint(Breakpoint: BreakpointEnum | string) {
		return this.breakpointService.getMinValueByBreakpoint(Breakpoint);
	}

	getMaxHeightContainer(): string {
		if (this.windowSize >= this.minValueByBreakpoint('md')) {
			return this.containerMaxHeight;
		}

		return 'none';
	}

	loginWithProvider(provider: ProviderEnum): void {
		let currentProvider;
		if (provider === ProviderEnum.GOOGLE) {
			currentProvider = new GoogleAuthProvider();
		} else {
			currentProvider = new GithubAuthProvider();
		}

		this.authService.loginWithPopup(currentProvider).then(currentUser => {
			const newUser: IUser = {
				account: {
					createdAt: currentUser.user.metadata.creationTime ?? '',
					lastLogin: currentUser.user.metadata.lastSignInTime ?? '',
				},
				profile: {
					displayName: currentUser.user.displayName ?? '',
					email: currentUser.user.email ?? '',
					phone: currentUser.user.phoneNumber ?? '',
					avatar: currentUser.user.photoURL ?? '',
				},
				list: [],
			};

			this.store.dispatch(
				UserActions.init.addUser({
					payload: { userId: currentUser.user.uid, data: newUser },
				}),
			);

			this.router.navigateByUrl('/home');
		});
	}

	private setResizeBreakpoint(): void {
		this.breakpointService
			.getCurrentBreakpoint()
			.subscribe((state: BreakpointState) => {
				const currentBreakpoint =
					this.breakpointService.getCurrentBreakpointValue(state);

				if (currentBreakpoint) {
					this.breakpoint =
						this.breakpointService.getBreakpoint(currentBreakpoint);
				}
			});
	}
}
