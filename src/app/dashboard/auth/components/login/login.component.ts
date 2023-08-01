import { Component, OnInit } from '@angular/core';
import {
	IconDefinition,
	faGoogle,
	faGithub,
} from '@fortawesome/free-brands-svg-icons';
import { BreakpointState } from '@angular/cdk/layout';
import { ResizeService } from '../../../../shared/service/resize.service';
import { BreakpointEnum } from '../../../../shared/enum/breakpoint.enum';
import { BreakpointService } from '../../../../shared/service/breakpoint.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
	hidePassword!: boolean;
	faGoogle: IconDefinition = faGoogle;
	faGithub: IconDefinition = faGithub;

	windowSize!: number;
	breakpointValue!: number;
	breakpoint!: BreakpointEnum;

	currentBreakpoint!: string;

	constructor(
		private resizeService: ResizeService,
		private breakpointService: BreakpointService,
	) {}

	ngOnInit(): void {
		this.hidePassword = false;
		this.windowSize = this.resizeService.getScreenWidth();
		this.breakpointValue = window.innerWidth <= 960 ? 1 : 2;

		this.setResizeBreakpoint();
	}

	shownPassword(): void {
		this.hidePassword = !this.hidePassword;
	}

	detectScreenSize() {
		this.windowSize = this.resizeService.getScreenWidth();
		this.breakpointValue = window.innerWidth <= 960 ? 1 : 2;
	}

	minValueByBreakpoint(Breakpoint: BreakpointEnum | string) {
		return this.breakpointService.getMinValueByBreakpoint(Breakpoint);
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
