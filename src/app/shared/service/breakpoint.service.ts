import {
	BreakpointObserver,
	BreakpointState,
	Breakpoints,
} from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

	getBreakpoint(currentBreakpoint: string): Observable<BreakpointEnum> {
		switch (currentBreakpoint) {
			case '(max-width: 599.98px)':
				return of(BreakpointEnum.XS);

			case '(min-width: 600px) and (max-width: 959.98px)':
				return of(BreakpointEnum.SM);

			case '(min-width: 960px) and (max-width: 1279.98px)':
				return of(BreakpointEnum.MD);

			case '(min-width: 1280px) and (max-width: 1919.98px)':
				return of(BreakpointEnum.LG);

			default:
				return of(BreakpointEnum.XL);
		}
	}

	getCurrentBreakpointValue(
		state: BreakpointState,
	): Observable<BreakpointEnum> {
		const currentBreakpoint = Object.entries(state.breakpoints).find(
			breakpoint => breakpoint[1],
		)?.[0];

		switch (currentBreakpoint) {
			case '(max-width: 599.98px)':
				return of(BreakpointEnum.XS);
			case '(min-width: 600px) and (max-width: 959.98px)':
				return of(BreakpointEnum.SM);
			case '(min-width: 960px) and (max-width: 1279.98px)':
				return of(BreakpointEnum.MD);
			case '(min-width: 1280px) and (max-width: 1919.98px)':
				return of(BreakpointEnum.LG);
			default:
				return of(BreakpointEnum.XL);
		}
	}

	getMinValueByBreakpoint(breakpoint: BreakpointEnum): Observable<number> {
		switch (breakpoint) {
			case BreakpointEnum.SM:
				return of(BreakpointMinValueEnum.SM);

			case BreakpointEnum.MD:
				return of(BreakpointMinValueEnum.MD);

			case BreakpointEnum.LG:
				return of(BreakpointMinValueEnum.LG);

			default:
				return of(BreakpointMinValueEnum.XL);
		}
	}
}
