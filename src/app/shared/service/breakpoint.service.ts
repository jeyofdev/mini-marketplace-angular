import {
	BreakpointObserver,
	BreakpointState,
	Breakpoints,
} from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
	BreakpointEnum,
	BreakpointMinValueEnum,
} from '@shared/enum/breakpoint.enum';

@Injectable({
	providedIn: 'root',
})
export class BreakpointService {
	constructor(private breakpointObserver: BreakpointObserver) {}

	getCurrentBreakpoint(): Observable<BreakpointState> {
		return this.breakpointObserver.observe([
			Breakpoints.XSmall,
			Breakpoints.Small,
			Breakpoints.Medium,
			Breakpoints.Large,
			Breakpoints.XLarge,
		]);
	}

	getBreakpoint(currentBreakpoint: string): BreakpointEnum {
		switch (currentBreakpoint) {
			case '(max-width: 599.98px)':
				return BreakpointEnum.XS;

			case '(min-width: 600px) and (max-width: 959.98px)':
				return BreakpointEnum.SM;

			case '(min-width: 960px) and (max-width: 1279.98px)':
				return BreakpointEnum.MD;

			case '(min-width: 1280px) and (max-width: 1919.98px)':
				return BreakpointEnum.LG;

			default:
				return BreakpointEnum.XL;
		}
	}

	getCurrentBreakpointValue(state: BreakpointState) {
		return Object.entries(state.breakpoints)?.find(
			breakpoint => breakpoint[1],
		)?.[0];
	}

	getMinValueByBreakpoint(breakpoint: BreakpointEnum | string): number {
		switch (breakpoint) {
			case BreakpointEnum.SM:
				return BreakpointMinValueEnum.SM;

			case BreakpointEnum.MD:
				return BreakpointMinValueEnum.MD;

			case BreakpointEnum.LG:
				return BreakpointMinValueEnum.LG;

			default:
				return BreakpointMinValueEnum.XL;
		}
	}
}
