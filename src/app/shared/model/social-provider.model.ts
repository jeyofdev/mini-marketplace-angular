import { IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { ProviderEnum } from '../enum/provider.enum';

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
	icon: IconDefinition;
	size: string;
	outline: boolean;
	name: ProviderEnum;
}
