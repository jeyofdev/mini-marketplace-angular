import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fullname' })
export class FullnamePipe implements PipeTransform {
	transform(value: string | null): string {
		if (value) {
			const valueArr = value?.split(' ');

			return value
				? valueArr
						?.filter((word, index) => index < valueArr?.length - 1)
						.join(' ')
				: '';
		}

		return '';
	}
}
