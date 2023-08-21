import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'convertToString' })
export class ConvertToStringPipe implements PipeTransform {
	transform(value: number): string {
		if (value) {
			return String(value);
		}

		return '';
	}
}
