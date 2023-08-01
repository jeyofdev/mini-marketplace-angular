import { Component, OnInit } from '@angular/core';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { ISocialProvider } from 'src/app/shared/model/social-provider.model';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	socialProviders!: ISocialProvider[];

	ngOnInit(): void {
		this.socialProviders = [
			{
				label: 'Connect with Google',
				icon: faGoogle,
				color: 'primary',
				size: '100%',
				outline: true,
			},
			{
				label: 'Connect with Github',
				icon: faGithub,
				color: 'primary',
				size: '100%',
				outline: true,
			},
		];
	}
	// <app-square-button
	// 						label="Connect with Google"
	// 						color="primary"
	// 						[icon]="faGoogle"
	// 						size="100%"
	// 					></app-square-button>
	// 					<app-square-button
	// 						label="Connect with Github"
	// 						color="primary"
	// 						[icon]="faGithub"
	// 						size="100%"
	// 					></app-square-button>
	// hidePassword!: boolean;
	// faGoogle: IconDefinition = faGoogle;
	// faGithub: IconDefinition = faGithub;
	// windowSize!: number;
	// breakpointValue!: number;
	// breakpoint!: BreakpointEnum;
	// currentBreakpoint!: string;
	// constructor(
	// 	private resizeService: ResizeService,
	// 	private breakpointService: BreakpointService,
	// ) {}
	// ngOnInit(): void {
	// 	// 	this.hidePassword = false;
	// 	// 	this.windowSize = this.resizeService.getScreenWidth();
	// 	// 	this.breakpointValue = window.innerWidth <= 960 ? 1 : 2;
	// 	// 	this.setResizeBreakpoint();
	// }
	// shownPassword(): void {
	// 	this.hidePassword = !this.hidePassword;
	// }
	// detectScreenSize() {
	// 	this.windowSize = this.resizeService.getScreenWidth();
	// 	this.breakpointValue = window.innerWidth <= 960 ? 1 : 2;
	// }
	// minValueByBreakpoint(Breakpoint: BreakpointEnum | string) {
	// 	return this.breakpointService.getMinValueByBreakpoint(Breakpoint);
	// }
	// private setResizeBreakpoint(): void {
	// 	this.breakpointService
	// 		.getCurrentBreakpoint()
	// 		.subscribe((state: BreakpointState) => {
	// 			const currentBreakpoint =
	// 				this.breakpointService.getCurrentBreakpointValue(state);
	// 			if (currentBreakpoint) {
	// 				this.breakpoint =
	// 					this.breakpointService.getBreakpoint(currentBreakpoint);
	// 			}
	// 		});
	// }
}
