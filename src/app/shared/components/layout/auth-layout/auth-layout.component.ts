import { BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { BreakpointEnum } from 'src/app/shared/enum/breakpoint.enum';
import { IImage } from 'src/app/shared/model/image.model';
import { ISocialProvider } from 'src/app/shared/model/social-provider.model';
import { BreakpointService } from 'src/app/shared/service/breakpoint.service';
import { ResizeService } from 'src/app/shared/service/resize.service';

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

	windowSize!: number;
	breakpointValue!: number;
	breakpoint!: BreakpointEnum;

	currentBreakpoint!: string;

	constructor(
		private resizeService: ResizeService,
		private breakpointService: BreakpointService,
	) {}

	ngOnInit(): void {
		this.windowSize = this.resizeService.getScreenWidth();
		this.breakpointValue = window.innerWidth <= 960 ? 1 : 2;

		this.setResizeBreakpoint();
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
