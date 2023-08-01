import { BreakpointState } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import {
	IconDefinition,
	faGithub,
	faGoogle,
} from '@fortawesome/free-brands-svg-icons';
import { BreakpointEnum } from 'src/app/shared/enum/breakpoint.enum';
import { BreakpointService } from 'src/app/shared/service/breakpoint.service';
import { ResizeService } from 'src/app/shared/service/resize.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
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
