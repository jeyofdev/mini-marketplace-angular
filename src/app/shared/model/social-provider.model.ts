import { ProviderEnum } from '@shared/enum/provider.enum';

export interface ISocialProvider {
	label: string;
	color:
		| 'primary'
		| 'secondary'
		| 'success'
		| 'warning'
		| 'danger'
		| 'info'
		| 'help'
		| 'danger';
	icon: string;
	size: string;
	outline: boolean;
	name: ProviderEnum;
}
