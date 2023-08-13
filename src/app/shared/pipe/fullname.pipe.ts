import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fullname' })
export class FullnamePipe implements PipeTransform {
	transform(value: string | null): string {
		if (value) {
			const valueArr = value?.split(' ');

			if (valueArr.length === 3) {
				return value
					? valueArr
							?.filter((_, index) => index < valueArr?.length - 1)
							.join(' ')
					: '';
			}

			return value;
		}

		return '';
	}
}
