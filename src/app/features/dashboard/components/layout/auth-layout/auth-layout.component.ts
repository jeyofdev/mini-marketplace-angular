import { GoogleAuthProvider, GithubAuthProvider } from '@angular/fire/auth';
import { BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { BreakpointEnum } from '@shared/enum/breakpoint.enum';
import { ProviderEnum } from '@shared/enum/provider.enum';
import { IImage } from '@shared/model/image.model';
import { ISocialProvider } from '@shared/model/social-provider.model';
import { BreakpointService } from '@shared/service/breakpoint.service';
import { ResizeService } from '@shared/service/resize.service';
import { AuthService } from '@shared/service/auth.service';
import { Router } from '@angular/router';
import { IUser } from '@core/model/user.model';
import { Store } from '@ngrx/store';
import { UserActions } from '@core/state/user/actions/user-index.actions';
import { UserInformationsService } from '@core/service/user-informations.service';
import { map, Observable, of, switchMap } from 'rxjs';

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
		private userInformationsService: UserInformationsService,
		private router: Router,
		private store: Store,
	) {}

	ngOnInit(): void {
		this.detectScreenSize();
		this.setResizeBreakpoint();
	}

	detectScreenSize() {
		this.windowSize = this.resizeService.getScreenWidth();

		this.minValueByBreakpoint(BreakpointEnum.MD)
			.pipe(
				switchMap(minBreakpointValue => {
					this.breakpointValue = window.innerWidth < minBreakpointValue ? 1 : 2;
					return of(this.breakpointValue);
				}),
			)
			.subscribe();
	}

	minValueByBreakpoint(Breakpoint: BreakpointEnum) {
		return this.breakpointService.getMinValueByBreakpoint(Breakpoint);
	}

	getMaxHeightContainer(): Observable<string> {
		return this.minValueByBreakpoint(BreakpointEnum.MD).pipe(
			switchMap(minBreakpointValue => {
				if (this.windowSize >= minBreakpointValue) {
					return of(this.containerMaxHeight);
				} else {
					return of();
				}
			}),
		);
	}

	loginWithProvider(provider: ProviderEnum): void {
		let currentProvider;
		if (provider === ProviderEnum.GOOGLE) {
			currentProvider = new GoogleAuthProvider();
		} else {
			currentProvider = new GithubAuthProvider();
		}

		this.authService.loginWithPopup(currentProvider).pipe(
			map(currentUser => {
				const newUser: IUser = {
					account: {
						createdAt: currentUser.user.metadata.creationTime ?? '',
						lastLogin: currentUser.user.metadata.lastSignInTime ?? '',
					},
					profile: {
						firstname: '',
						lastname: '',
						username: currentUser.user.displayName ?? '',
						email: currentUser.user.email ?? '',
						phone: currentUser.user.phoneNumber ?? '',
						avatar: currentUser.user.photoURL ?? '',
					},
					list: [],
				};

				this.store.dispatch(
					UserActions.informations.addUser({
						payload: { userId: currentUser.user.uid, data: newUser },
					}),
				);

				this.router.navigateByUrl('/home');
			}),
		);
	}

	private setResizeBreakpoint(): void {
		this.breakpointService
			.getCurrentBreakpoint()
			.subscribe((state: BreakpointState) => {
				this.breakpointService
					.getCurrentBreakpointValue(state)
					.subscribe(breakpointEnum => {
						this.breakpoint = breakpointEnum;
					});
			});
	}
}
